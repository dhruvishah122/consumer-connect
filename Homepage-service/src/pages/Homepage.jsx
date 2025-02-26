import { CompanySlider } from "../components/CompanySlider.jsx";
import { StatsSection } from "../components/StatsSection.jsx";
import { ReviewsSlider } from "../components/ReviewsSlider.jsx";
import { SectionTitle } from "../components/Sectiontitle.jsx";

export default function HomePage() {
  return (
    <div className="p-6 bg-blue-100 text-blue-900">
      <SectionTitle title="Our Partner Organizations" />
      <CompanySlider />
      <SectionTitle title="Our Impact" />
      <StatsSection />
      <SectionTitle title="What Customers Say" />
      <ReviewsSlider />
    </div>
  );
}
