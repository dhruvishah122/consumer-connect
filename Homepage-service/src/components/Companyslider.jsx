import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const companies = [
  { id: 1, name: "Company A", logo: "/logos/companyA.png" },
  { id: 2, name: "Company B", logo: "/logos/companyB.png" },
  { id: 3, name: "Company C", logo: "/logos/companyC.png" },
  { id: 4, name: "Company D", logo: "/logos/companyD.png" },
];

export function CompanySlider() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {companies.map((company) => (
          <CarouselItem key={company.id} className="p-4">
            <Card className="flex justify-center items-center p-6 shadow-md">
              <CardContent className="flex flex-col items-center">
                <img src={company.logo} alt={company.name} className="w-24 h-24 object-contain" />
                <p className="text-center mt-2 font-semibold">{company.name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
