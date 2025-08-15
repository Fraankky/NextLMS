"use client" 

import * as React from "react";
import { Button } from "@/components/ui/button";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const styles = tv({
  slots: {
    base: "w-full",
    drop: "flex w-full items-center justify-center rounded-xl border border-dashed transition-all p-6 text-sm outline-none",
    button: "mt-2",
    hint: "mt-2 text-xs text-muted-foreground",
    fileList: "mt-3 text-sm space-y-1"
  },
  variants: {
    variant: {
      default: {
        drop: "bg-muted/30 hover:bg-muted/50 border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-ring",
      },
      ghost: {
        drop: "bg-transparent hover:bg-muted/30 border-muted-foreground/30",
      },
    },
    size: {
      sm: { drop: "p-4 text-xs", button: "h-8" },
      md: { drop: "p-6", button: "h-9" },
      lg: { drop: "p-8 text-base", button: "h-10" },
    },
    dragging: {
      true: { drop: "border-primary bg-primary/5" },
    },
    invalid: {
      true: { drop: "border-destructive/60 bg-destructive/5" },
    },
    disabled: {
      true: { drop: "opacity-60 pointer-events-none cursor-not-allowed" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type FileInputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  value?: File[];                       // controlled (opsional)
  onChange?: (files: File[]) => void;   // <- pertahankan API
  className?: string;
  buttonText?: string;
  required?: boolean;
  invalid?: boolean;
} & VariantProps<typeof styles>;

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id,
      name,
      placeholder,
      hint,
      accept,
      multiple,
      disabled,
      value,
      onChange,
      className,
      buttonText = "Choose File",
      required,
      variant,
      size,
      invalid,
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // expose inner ref ke parent
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const autoId = React.useId();
    const hintId = React.useId();
    const [internal, setInternal] = React.useState<File[]>([]);
    const [dragging, setDragging] = React.useState(false);

    const files = value ?? internal;
    const s = styles({ variant, size, dragging, invalid, disabled });

    const setFiles = React.useCallback(
      (list: FileList | null) => {
        const arr = list ? Array.from(list) : [];
        if (value === undefined) setInternal(arr);
        onChange?.(arr);
      },
      [onChange, value]
    );


    return (
      <div className={cn(s.base(), className)}>
        <div
          id={id ?? autoId}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-disabled={disabled || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? hintId : undefined}
          className={s.drop()}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <div className="text-center">
            <p className="font-medium">
              {placeholder ?? "Choose file"}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Drag & drop file ke sini, atau klik tombol di bawah
            </p>

            <input
              ref={inputRef}
              id={(id ?? autoId) + "-input"}
              type="file"
              name={name}
              className="sr-only"
              hidden
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              required={required}
              onChange={(e) => setFiles(e.target.files)}
            />

            <Button
              type="button"
              className={s.button()}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              disabled={disabled}
            >
              {buttonText}
            </Button>
          </div>
        </div>

        {hint && (
          <p id={hintId} className={s.hint()}>
            {hint}
          </p>
        )}

        {files.length > 0 && (
          <ul className={s.fileList()}>
            {files.map((f, i) => (
              <li key={i} className="truncate">
                {f.name}{" "}
                <span className="text-muted-foreground">
                  ({Math.round(f.size / 1024)} KB)
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
