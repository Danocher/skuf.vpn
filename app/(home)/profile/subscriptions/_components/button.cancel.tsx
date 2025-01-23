import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { PaymentsService } from "@/services/payments.service";
import { toast } from "sonner";
  interface subcription{
    subscription_id:string
  }
export default function ButtonCancel({subscription_id}:subcription) {
    function handlerCancel() {
        PaymentsService.cancelSubscription(subscription_id)
        .then((res) => {
            toast.success("Подписка отменена")
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Ошибка отмены подписки")
        })
    }
    return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant="outline" className="w-full gap-2 hover:bg-red-800/50 hover:text-red-400" >
            <Ban className="w-4 h-4" /> Отменить подписку
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно хотите отменить подписку?</AlertDialogTitle>
          <AlertDialogDescription>
            Подписку можно возобновить в любое время.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handlerCancel}>Продолжить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        
    )
}