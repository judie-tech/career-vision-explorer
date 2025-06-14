
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Images, Upload, Edit, Trash2, Eye } from "lucide-react";
import { useHomeImages } from "@/hooks/use-home-images";
import HomeImageDialog from "./HomeImageDialog";
import ImagePreviewDialog from "./ImagePreviewDialog";
import { toast } from "@/components/ui/sonner";

const HomeImageManagement = () => {
  const { homeImages, addImage, updateImage, deleteImage } = useHomeImages();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleEdit = (image: any) => {
    setSelectedImage(image);
    setIsEditDialogOpen(true);
  };

  const handlePreview = (image: any) => {
    setSelectedImage(image);
    setIsPreviewDialogOpen(true);
  };

  const handleDelete = (imageId: string) => {
    deleteImage(imageId);
    toast.success("Image deleted successfully");
  };

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

  const getCategoryStats = () => {
    const stats = homeImages.reduce((acc, img) => {
      acc[img.category] = (acc[img.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(stats);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <Images className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{homeImages.length}</div>
          </CardContent>
        </Card>
        
        {getCategoryStats().slice(0, 3).map(([category, count]) => (
          <Card key={category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {category.replace('-', ' ')}
              </CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Homepage Images</CardTitle>
              <CardDescription>
                Manage all images displayed on the homepage
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.alt || image.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getCategoryColor(image.category)}>
                      {image.category.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(image)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {homeImages.length === 0 && (
            <div className="text-center py-12">
              <Images className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No images yet</h3>
              <p className="mt-2 text-gray-500">Get started by adding your first image.</p>
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <HomeImageDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={addImage}
        mode="create"
      />

      <HomeImageDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={(data) => updateImage(selectedImage.id, data)}
        mode="edit"
        initialData={selectedImage}
      />

      <ImagePreviewDialog
        open={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        image={selectedImage}
      />
    </div>
  );
};

export default HomeImageManagement;
