
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import type { HomeImage } from "@/hooks/use-home-images";

interface HomeImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<HomeImage, 'id'>) => void;
  mode: 'create' | 'edit';
  initialData?: HomeImage | null;
}

const HomeImageDialog = ({ open, onOpenChange, onSave, mode, initialData }: HomeImageDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'career-paths' as HomeImage['category'],
    description: '',
    alt: ''
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title,
        url: initialData.url,
        category: initialData.category,
        description: initialData.description || '',
        alt: initialData.alt || ''
      });
    } else if (mode === 'create') {
      setFormData({
        title: '',
        url: '',
        category: 'career-paths',
        description: '',
        alt: ''
      });
    }
  }, [mode, initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSave(formData);
    toast.success(`Image ${mode === 'create' ? 'added' : 'updated'} successfully`);
    onOpenChange(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a cloud service
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          url: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Image' : 'Edit Image'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter image title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: HomeImage['category']) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="features">Features</SelectItem>
                  <SelectItem value="career-paths">Career Paths</SelectItem>
                  <SelectItem value="testimonials">Testimonials</SelectItem>
                  <SelectItem value="cta">Call to Action</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="url">Image URL *</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="Enter image URL or upload file"
                required
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div>
            <Label htmlFor="alt">Alt Text</Label>
            <Input
              id="alt"
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              placeholder="Alternative text for accessibility"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the image"
              rows={3}
            />
          </div>

          {formData.url && (
            <div>
              <Label>Preview</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img
                  src={formData.url}
                  alt={formData.alt || formData.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Add Image' : 'Update Image'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HomeImageDialog;
