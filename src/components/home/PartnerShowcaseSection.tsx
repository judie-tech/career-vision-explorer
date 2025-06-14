
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PartnerShowcaseSection = () => {
  const partnersShowcase = [
    { 
      id: 1,
      name: "TechGiant Inc.", 
      logo: "/lovable-uploads/37656cc1-be74-4d59-8843-b6729c619a2a.png",
      website: "https://techgiant.com",
      category: "employer"
    },
    { 
      id: 2,
      name: "Global University", 
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
      website: "https://globaluniversity.edu",
      category: "education"
    },
    { 
      id: 3,
      name: "Future Staffing", 
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=100&h=100",
      website: "https://futurestaffing.com",
      category: "recruiting"
    },
    { 
      id: 4,
      name: "InnovateHR", 
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=100&h=100",
      website: "https://innovatehr.com",
      category: "recruiting"
    },
    { 
      id: 5,
      name: "Career Academy", 
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=100&h=100",
      website: "https://careeracademy.edu",
      category: "education"
    },
    { 
      id: 6,
      name: "Elite Corp", 
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&h=100",
      website: "https://elitecorp.com",
      category: "employer"
    },
  ];

  const handlePartnerClick = (partner: typeof partnersShowcase[0]) => {
    window.open(partner.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the organizations already transforming their talent acquisition and development
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mb-12">
          {partnersShowcase.map((partner) => (
            <div 
              key={partner.id} 
              className="group cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => handlePartnerClick(partner)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/20">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-16 w-16 object-contain mx-auto mb-3 transition-transform duration-300 group-hover:scale-105"
                />
                <p className="text-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/partners">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              View All Partners
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcaseSection;
