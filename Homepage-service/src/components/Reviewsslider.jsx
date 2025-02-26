import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  { id: 1, name: "Sneha", text: "Amazing service! My issue was resolved quickly." },
  { id: 2, name: "Rahul", text: "Very user-friendly and reliable support." },
  { id: 3, name: "Priya", text: "Helped me get my refund within days. Highly recommend!" },
];

export function ReviewsSlider() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="p-4">
            <Card className="p-6 shadow-md">
              <CardContent>
                <p className="italic">`{review.text}`</p>
                <p className="text-right mt-2 font-semibold">- {review.name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
