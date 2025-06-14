
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const RecommendedCoursesCard = () => {
  const courses = [
    {
      title: "Advanced React Patterns",
      modules: 15,
      hours: 8
    },
    {
      title: "Leadership Skills",
      modules: 12,
      hours: 6
    },
    {
      title: "Cloud Architecture",
      modules: 18,
      hours: 10
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recommended Courses</CardTitle>
        <CardDescription>Based on your career goals and skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <div className="p-3">
                <h4 className="font-medium">{course.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{course.modules} modules • {course.hours} hours</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="w-full">View Course</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedCoursesCard;
