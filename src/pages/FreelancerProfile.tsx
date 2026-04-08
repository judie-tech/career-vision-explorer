
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useFreelancers } from "@/hooks/use-freelancers";
import { useMessaging } from "@/hooks/use-messaging";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, MessageCircle, Check, Video } from "lucide-react";
import { VideoCallDialog } from "@/components/freelancer/VideoCallDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const FreelancerProfile = () => {
  const { id } = useParams();
  const { getFreelancerById } = useFreelancers();
  const { sendMessage, isLoading } = useMessaging();
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const freelancer = getFreelancerById(id || "");

  if (!freelancer) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Freelancer not found</h1>
            <p className="text-muted-foreground">The freelancer profile you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const success = await sendMessage(freelancer.id, message, selectedTier);
    if (success) {
      setMessage("");
      setSelectedTier("");
      setIsMessageDialogOpen(false);
      toast.success("Message sent successfully!");
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-6xl">
        {/* Header Section */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={freelancer.profileImage} />
                <AvatarFallback className="text-2xl">{freelancer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{freelancer.name}</h1>
                  <p className="text-xl text-muted-foreground mb-2">{freelancer.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{freelancer.rating}</span>
                      <span>({freelancer.completedProjects} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(freelancer.joinDate).getFullYear()}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{freelancer.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <VideoCallDialog freelancer={freelancer} selectedTier={selectedTier} />
                  <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send a Message</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Select a service tier (optional)</label>
                          <div className="grid gap-2 mt-2">
                            {freelancer.pricing.map((tier) => (
                              <div
                                key={tier.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedTier === tier.tier
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                                onClick={() => setSelectedTier(tier.tier)}
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium capitalize">{tier.tier}</span>
                                    <span className="text-sm text-muted-foreground ml-2">- {tier.title}</span>
                                  </div>
                                  <span className="font-bold">${tier.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Message</label>
                          <Textarea
                            placeholder="Describe your project requirements..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-2"
                            rows={4}
                          />
                        </div>
                        <Button onClick={handleSendMessage} disabled={isLoading} className="w-full">
                          {isLoading ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {freelancer.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {freelancer.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {freelancer.pricing.map((tier) => (
                <Card key={tier.id} className="relative hover:shadow-lg transition-shadow">
                  {tier.tier === 'standard' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <Badge variant="outline" className="w-fit mx-auto capitalize">{tier.tier}</Badge>
                    <CardTitle className="text-xl">{tier.title}</CardTitle>
                    <div className="text-3xl font-bold">${tier.price}</div>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">{tier.deliveryDays}</span> days delivery
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{tier.revisions}</span> revisions
                      </div>
                    </div>
                    <div className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        setSelectedTier(tier.tier);
                        setIsMessageDialogOpen(true);
                      }}
                    >
                      Continue (${tier.price})
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground">Be the first to leave a review for this freelancer!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FreelancerProfile;
