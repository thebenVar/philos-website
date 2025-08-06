import { FaUsers, FaUtensils, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";

const services = [
  {
    icon: FaUsers,
    title: "Private Events",
    description: "Host your special occasion in our private dining room (up to 40 guests)",
  },
  {
    icon: FaUtensils,
    title: "Catering Services",
    description: "Bring authentic Italian flavors to your office or event",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Cooking Classes",
    description: "Learn to make authentic Italian pizza and pasta from our chefs",
  },
  {
    icon: FaBriefcase,
    title: "Corporate Lunch",
    description: "Special lunch packages for business meetings and corporate events",
  },
];

export default function SpecialServicesPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary-red">Special Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="card flex flex-col items-center text-center p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <service.icon className="text-5xl mb-4 text-accent-gold" />
              <h2 className="text-2xl font-bold mb-2 text-primary-red">{service.title}</h2>
              <p className="text-gray-700 text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
