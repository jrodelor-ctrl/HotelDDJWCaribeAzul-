import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  loading?: boolean;
  children?: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
};

export function Modal({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  loading = false,
  children,
  onConfirm,
  onClose
}: ModalProps) {
  if (!open) return null;

  const confirmVariant = variant === "danger" ? "destructive" : "default";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <article className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4">
          <h2
            id="modal-title"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {title}
          </h2>

          {description ? (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>

        {children ? (
          <div className="mb-5 text-sm text-slate-600 dark:text-slate-300">
            {children}
          </div>
        ) : null}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={loading}
            className={cn(loading && "opacity-70")}
          >
            {loading ? "Procesando..." : confirmText}
          </Button>
        </div>
      </article>
    </div>
  );
}