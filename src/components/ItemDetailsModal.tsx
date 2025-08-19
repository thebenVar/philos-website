"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { MenuItem, CartItem } from '../types/menu';
import { getImageDerivativePath } from '../utils/menuUtils';

type Variant = { label: string; price: number; image?: string };

export interface ItemDetailsModalProps {
	isOpen: boolean;
	item: MenuItem | null;
	category?: string;
	cart: CartItem[];
	onClose: () => void;
	onAddToCart: (item: MenuItem, quantity: number, addons?: MenuItem[]) => void;
	addons?: MenuItem[];
	onShowAddons?: (item: MenuItem) => void;
}

const normalizeImage = (base?: string | null, kind: 'large' | 'thumb' = 'large') => {
	if (!base) return undefined;
	const src = base.startsWith('/') || base.startsWith('http') ? base : `/dishes/${base}`;
	return getImageDerivativePath(src, kind);
};

const slugify = (input: string): string =>
	(input || '')
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/-{2,}/g, '-')
		.replace(/^-+|-+$/g, '');

export default function ItemDetailsModal({ isOpen, item, category, cart, onClose, onAddToCart, addons = [], onShowAddons }: ItemDetailsModalProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [details, setDetails] = useState<{ description?: string; image?: string; variants?: Variant[]; calories?: number; tags?: string[]; related?: { beverage?: string; side?: string; addon?: string } } | null>(null);
	const [qty, setQty] = useState(1);
	const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

	const currentQty = useMemo(() => {
		if (!item) return 0;
		const ci = cart.find(c => c.name === item.name);
		return ci?.quantity || 0;
	}, [cart, item]);

	useEffect(() => {
		if (!isOpen || !item) return;
		let active = true;
		const load = async () => {
			setLoading(true); setError(null);
			try {
				const slug = slugify(item.name);
				const res = await fetch(`/api/items/${slug}`, { cache: 'no-store' });
				if (!res.ok) throw new Error('Failed to load item');
				const json = await res.json();
				if (!active) return;
				// Sort variants by numeric size (e.g., 8", 10", 12") if labels contain numbers
				const sortVariants = (vars?: Variant[]) => {
					if (!vars || !vars.length) return vars;
					const num = (s: string) => {
						const m = s.match(/(\d+)/);
						return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
					};
					return [...vars].sort((a, b) => num(a.label) - num(b.label));
				};
				const sortedVariants: Variant[] | undefined = sortVariants(json?.item?.variants);
				setDetails({
					description: json?.item?.description,
					image: json?.item?.image,
					variants: sortedVariants,
					calories: json?.item?.calories,
					tags: json?.item?.tags,
					related: json?.item?.related,
				});
				// Default to smallest (first after sort) if provided
				if (sortedVariants?.length) setSelectedVariant(sortedVariants[0].label);
			} catch (e: any) {
				if (!active) return;
				setError(e?.message || 'Unable to load');
			} finally {
				if (active) setLoading(false);
			}
		};
		load();
		return () => { active = false; };
	}, [isOpen, item]);

	useEffect(() => {
		if (!isOpen) {
			setDetails(null);
			setSelectedVariant(null);
			setQty(1);
			setError(null);
		}
	}, [isOpen]);

	if (!isOpen || !item) return null;

	const baseImage = details?.image || (item as any).image || undefined;
	const largeSrc = normalizeImage(baseImage, 'large') || '/placeholders/menu-item.svg';
	const finalPrice = (() => {
		if (!details?.variants?.length) return item.price;
		const v = details.variants.find(v => v.label === selectedVariant) || details.variants[0];
		return v?.price ?? item.price;
	})();

	const add = () => {
		const toAdd: MenuItem = { ...item, price: finalPrice };
		onAddToCart(toAdd, qty);
	};

	return (
		<div className="fixed inset-0 z-[70] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />
			<div className="relative z-[75] bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden">
				<div className="grid md:grid-cols-2 gap-0">
					<div className="relative aspect-square bg-gray-100">
						<Image src={largeSrc} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
					</div>
					<div className="p-6 md:p-8">
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="text-2xl font-bold text-text-primary">{item.name}</h2>
								{category && <p className="text-sm text-text-secondary mt-1">{category}</p>}
							</div>
							<button onClick={onClose} aria-label="Close" className="text-2xl leading-none text-text-secondary hover:text-text-primary">×</button>
						</div>

						{loading && <p className="mt-4 text-sm text-text-secondary">Loading details…</p>}
						{error && <p className="mt-4 text-sm text-red-600">{error}</p>}

						{details?.description && <p className="mt-3 text-text-secondary">{details.description}</p>}
						{typeof details?.calories === 'number' && (
							<p className="mt-2 text-sm text-text-light">Approx. {details.calories} kcal</p>
						)}

						{details?.variants?.length ? (
							<div className="mt-4">
								<h4 className="text-sm font-semibold text-text-primary mb-2">Choose a size</h4>
								<div className="flex flex-wrap gap-2">
									{details.variants.map((v) => (
										<button
											key={v.label}
											onClick={() => setSelectedVariant(v.label)}
											className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${selectedVariant === v.label ? 'bg-primary-red text-white border-primary-red' : 'bg-gray-50 text-text-secondary border-border hover:bg-gray-100'}`}
										>
											{v.label}
										</button>
									))}
								</div>
							</div>
						) : null}

						<div className="mt-6 flex items-center justify-between">
							<div className="flex items-center border border-border rounded-md">
								<button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-1 text-text-secondary hover:bg-gray-100 rounded-l-md" aria-label="Decrease quantity">-</button>
								<span className="px-4 py-1 min-w-[3rem] text-center border-l border-r border-border font-semibold text-text-primary">{qty}</span>
								<button onClick={() => setQty(q => q + 1)} className="px-3 py-1 text-text-secondary hover:bg-gray-100 rounded-r-md" aria-label="Increase quantity">+</button>
							</div>
							<div className="text-right">
								<div className="text-xl font-bold text-primary-red">₹{finalPrice}</div>
								{currentQty > 0 && <div className="text-xs text-green-600 mt-1">In cart: {currentQty}</div>}
							</div>
						</div>

						<div className="mt-6 flex gap-3">
							<button onClick={add} className="px-4 py-2 bg-primary-red text-white font-semibold rounded-md hover:bg-primary-red-hover">Add to cart</button>
							{onShowAddons && (
								<button onClick={() => onShowAddons(item)} className="px-4 py-2 border border-border text-text-primary font-semibold rounded-md hover:bg-gray-100">Extras</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

