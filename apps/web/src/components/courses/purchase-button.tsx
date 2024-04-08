import { Button } from "@repo/ui/components/ui/button";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { toast } from "sonner";

interface PurchaseButtonProps {
  productId: string;
}
export function PurchaseButton({ productId }: PurchaseButtonProps) {
  const loading = false;
  async function handlePurchaseProduct(productId: string) {
    try {
      console.log("Enrolling in course with id: ", productId);

      toast.success("Enrollment successful! 🎉");
    } catch (error) {
      toast.error("You are already enrolled in this course.");
    }
  }

  return (
    <Button
      onClick={() => handlePurchaseProduct(productId)}
      className="ring-1 ring-cyan-700 bg-slate-950 w-24"
    >
      {loading ? <Spinner /> : "Enroll"}
    </Button>
  );
}
