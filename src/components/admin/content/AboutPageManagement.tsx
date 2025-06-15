
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Save, Plus, Trash2, BarChart3, Target, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AboutContent {
  id: string;
  type: string;
  title: string;
  content: string;
  order: number;
  isActive: boolean;
}

export const AboutPageManagement = () => {
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const [heroContent, setHeroContent] = useState({
    title: "Navigate your career journey with confidence",
    subtitle: "We believe that everyone deserves to find meaningful work that aligns with their skills, values, and aspirations. Our AI-driven platform connects talent with opportunity.",
    badgeText: "✨ About Visiondrill"
  });

  const [missionContent, setMissionContent] = useState({
    title: "Democratizing Career Success",
    content: "At Visiondrill Career Explorer, we're committed to breaking down barriers in career development. Our platform leverages cutting-edge AI technology to provide personalized career guidance that was once only available to a privileged few.",
    badgeText: "🎯 Our Mission"
  });

  const [storyContent, setStoryContent] = useState({
    title: "Building the Future of Work",
    content: "Founded in 2024, Visiondrill Career Explorer was born from the vision to democratize career guidance and make quality career advice accessible to everyone. Our team of career experts, data scientists, and technologists work together to create innovative solutions for the modern job market.",
    badgeText: "📖 Our Story"
  });

  const [stats, setStats] = useState([
    { number: "10K+", label: "Job Seekers", icon: "Users" },
    { number: "500+", label: "Companies", icon: "Award" },
    { number: "95%", label: "Match Accuracy", icon: "BarChart3" },
    { number: "24/7", label: "Support", icon: "Target" }
  ]);

  const [features, setFeatures] = useState([
    {
      id: "1",
      title: "Smart Job Matching",
      description: "Our AI algorithms analyze your skills, experience, and preferences to find the perfect job matches.",
      icon: "Target"
    },
    {
      id: "2", 
      title: "Career Path Guidance",
      description: "Get personalized career roadmaps and skill development recommendations.",
      icon: "TrendingUp"
    },
    {
      id: "3",
      title: "Skills Assessment", 
      description: "Comprehensive skills evaluation to help you understand your strengths and growth areas.",
      icon: "Shield"
    },
    {
      id: "4",
      title: "Market Insights",
      description: "Stay informed about industry trends, salary benchmarks, and in-demand skills.",
      icon: "Star"
    }
  ]);

  const [achievements] = useState([
    "5,000+ successful job placements",
    "500+ partner companies", 
    "95% user satisfaction rate",
    "AI-powered matching technology"
  ]);

  const handleSave = (section: string) => {
    toast({
      title: "Success",
      description: `${section} updated successfully`,
    });
    setEditingSection(null);
  };

  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Feature description",
      icon: "Star"
    };
    setFeatures([...features, newFeature]);
  };

  const handleDeleteFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
    toast({
      title: "Feature deleted",
      description: "Feature has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">About Page Management</h2>
        <p className="text-muted-foreground">Manage the content and sections of the About page</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hero Section</CardTitle>
                <p className="text-sm text-muted-foreground">Main hero content at the top of the page</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSection(editingSection === "hero" ? null : "hero")}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {editingSection === "hero" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "hero" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-badge">Badge Text</Label>
                    <Input
                      id="hero-badge"
                      value={heroContent.badgeText}
                      onChange={(e) => setHeroContent({...heroContent, badgeText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-title">Title</Label>
                    <Input
                      id="hero-title"
                      value={heroContent.title}
                      onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Textarea
                      id="hero-subtitle"
                      value={heroContent.subtitle}
                      onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <Button onClick={() => handleSave("Hero Section")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Badge variant="secondary">{heroContent.badgeText}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold">{heroContent.title}</h3>
                  <p className="text-muted-foreground">{heroContent.subtitle}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mission">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Mission Section</CardTitle>
                <p className="text-sm text-muted-foreground">Company mission and values</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSection(editingSection === "mission" ? null : "mission")}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {editingSection === "mission" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "mission" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mission-badge">Badge Text</Label>
                    <Input
                      id="mission-badge"
                      value={missionContent.badgeText}
                      onChange={(e) => setMissionContent({...missionContent, badgeText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-title">Title</Label>
                    <Input
                      id="mission-title"
                      value={missionContent.title}
                      onChange={(e) => setMissionContent({...missionContent, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-content">Content</Label>
                    <Textarea
                      id="mission-content"
                      value={missionContent.content}
                      onChange={(e) => setMissionContent({...missionContent, content: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <Button onClick={() => handleSave("Mission Section")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Badge variant="secondary">{missionContent.badgeText}</Badge>
                  <h3 className="text-xl font-semibold">{missionContent.title}</h3>
                  <p className="text-muted-foreground">{missionContent.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Features Section</CardTitle>
                <p className="text-sm text-muted-foreground">Platform features and capabilities</p>
              </div>
              <Button onClick={handleAddFeature} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {features.map((feature) => (
                  <Card key={feature.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">{feature.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteFeature(feature.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="story">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Story Section</CardTitle>
                <p className="text-sm text-muted-foreground">Company history and background</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSection(editingSection === "story" ? null : "story")}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {editingSection === "story" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "story" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="story-badge">Badge Text</Label>
                    <Input
                      id="story-badge"
                      value={storyContent.badgeText}
                      onChange={(e) => setStoryContent({...storyContent, badgeText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-title">Title</Label>
                    <Input
                      id="story-title"
                      value={storyContent.title}
                      onChange={(e) => setStoryContent({...storyContent, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-content">Content</Label>
                    <Textarea
                      id="story-content"
                      value={storyContent.content}
                      onChange={(e) => setStoryContent({...storyContent, content: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <Button onClick={() => handleSave("Story Section")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Badge variant="secondary">{storyContent.badgeText}</Badge>
                  <h3 className="text-xl font-semibold">{storyContent.title}</h3>
                  <p className="text-muted-foreground">{storyContent.content}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Achievements:</h4>
                    <ul className="space-y-1">
                      {achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistics Section</CardTitle>
              <p className="text-sm text-muted-foreground">Key company metrics and numbers</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
