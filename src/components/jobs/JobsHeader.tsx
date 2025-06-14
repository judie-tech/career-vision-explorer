
import { Button } from "@/components/ui/button";
import { Heart, Briefcase } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { WishlistDialog } from "./WishlistDialog";

export const JobsHeader = () => {
  const { wishlistJobs } = useWishlist();

  return (
    <div className="text-center py-12 mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
          <Briefcase className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Find Your Dream Job
        </h1>
      </div>
      <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
        Discover thousands of opportunities tailored to your skills and preferences
      </p>
      
      <div className="flex justify-center">
        <WishlistDialog>
          <Button variant="outline" className="flex items-center gap-2">
            <Heart className={`h-4 w-4 ${wishlistJobs.length > 0 ? 'text-red-500 fill-current' : ''}`} />
            My Wishlist
            {wishlistJobs.length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {wishlistJobs.length}
              </span>
            )}
          </Button>
        </WishlistDialog>
      </div>
    </div>
  );
};
