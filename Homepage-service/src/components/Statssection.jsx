import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { id: 1, label: "Total Customers", value: "50K+" },
  { id: 2, label: "Happy Customers", value: "45K+" },
  { id: 3, label: "Resolved Complaints", value: "30K+" },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {stats.map((stat) => (
        <Card key={stat.id} className="p-6 shadow-lg">
          <CardContent className="text-center">
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
