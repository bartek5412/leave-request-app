 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (error) {
      setError(error.message ?? "Nie udało się zalogować.");
      setIsSubmitting(false);
      return;
    }

    // Po udanym logowaniu przejdź na stronę główną (dashboard)
    router.push("/");
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Zaloguj się</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Wprowadź adres email aby kontynuować
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Hasło</FieldLabel>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logowanie..." : "Zaloguj"}
          </Button>
        </Field>

      </FieldGroup>
    </form>
  )
}
