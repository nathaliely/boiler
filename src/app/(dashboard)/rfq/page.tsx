import RFQForm from "@/components/rfq/RFQForm";

export default function RFQPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Create RFQ</h1>
      <RFQForm />
    </div>
  );
}