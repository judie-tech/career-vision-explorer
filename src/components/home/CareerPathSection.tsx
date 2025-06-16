
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface CareerPathProps {
  careerPaths: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
}

const CareerPathSection = ({ careerPaths }: CareerPathProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Popular Career Paths</h2>
          <p className="mt-4 text-xl text-gray-500">Explore curated paths to guide your career journey</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {careerPaths.map((path) => (
            <Link key={path.id} to={`/career-paths/${path.id}`} className="block hover:no-underline">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <AspectRatio ratio={16/9} className="bg-gray-100">
                  <OptimizedImage 
                    src={path.image} 
                    alt={path.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    placeholder="/placeholder.svg"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
                  <p className="mt-2 text-gray-600">{path.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathSection;
