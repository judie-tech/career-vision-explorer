
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  testimonials: Array<{
    id: number;
    quote: string;
    author: string;
    role: string;
  }>;
}

const TestimonialSection = ({ testimonials }: TestimonialProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            See how others have transformed their careers with Visiondrill.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-scale futuristic-card">
              <CardContent className="p-6">
                <div className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</div>
                <div className="mt-4">
                  <p className="text-gray-900 font-medium">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
