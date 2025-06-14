
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const CareerProgressCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Career Progress</CardTitle>
        <CardDescription>Track your career journey and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
          <ul className="space-y-6">
            <li className="relative pl-14">
              <div className="absolute left-0 rounded-full bg-green-500 text-white w-14 h-6 flex items-center justify-center text-xs">
                Current
              </div>
              <div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
              <h4 className="text-lg font-medium">Senior Software Engineer</h4>
              <p className="text-sm text-gray-500">TechNova • 2023 - Present</p>
              <p className="text-sm mt-1">Leading frontend development and mentoring junior developers.</p>
            </li>
            <li className="relative pl-14">
              <div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300"></div>
              <h4 className="text-lg font-medium">Software Engineer</h4>
              <p className="text-sm text-gray-500">DataViz Solutions • 2020 - 2023</p>
              <p className="text-sm mt-1">Developed web applications using React and Node.js.</p>
            </li>
            <li className="relative pl-14">
              <div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300"></div>
              <h4 className="text-lg font-medium">Junior Developer</h4>
              <p className="text-sm text-gray-500">StartupX • 2018 - 2020</p>
              <p className="text-sm mt-1">Worked on frontend development with JavaScript and CSS.</p>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerProgressCard;
