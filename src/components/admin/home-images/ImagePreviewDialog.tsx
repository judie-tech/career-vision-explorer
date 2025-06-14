
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { HomeImage } from "@/hooks/use-home-images";

interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: HomeImage | null;
}

const ImagePreviewDialog = ({ open, onOpenChange, image }: ImagePreviewDialogProps) => {
  if (!image) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hero': return 'bg-blue-100 text-blue-800';
      case 'features': return 'bg-green-100 text-green-800';
      case 'career-paths': return 'bg-purple-100 text-purple-800';
      case 'testimonials': return 'bg-orange-100 text-orange-800';
      case 'cta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {image.title}
            <Badge className={getCategoryColor(image.category)}>
              {image.category.replace('-', ' ')}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border">
            <img
              src={image.url}
              alt={image.alt || image.title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          {image.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600">{image.description}</p>
            </div>
          )}

          {image.alt && (
            <div>
              <h4 className="font-medium mb-2">Alt Text</h4>
              <p className="text-gray-600">{image.alt}</p>
            </div>
          )}

          <div>
            <h4 className="font-medium mb-2">Image URL</h4>
            <p className="text-sm text-gray-500 break-all">{image.url}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
