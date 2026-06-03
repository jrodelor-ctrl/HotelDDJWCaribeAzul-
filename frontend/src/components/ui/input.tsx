import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <input
        id={id}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          "dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-900",
          className
        )}
        {...props}
      />

      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}