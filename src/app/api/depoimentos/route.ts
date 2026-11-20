import testimonials from "@/features/doctors/testimonials.json";

export function GET() {
  return Response.json(testimonials);
}
