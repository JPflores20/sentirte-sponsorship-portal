import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

const schema = z.object({
  nombre: z.string().trim().min(2, "Requerido").max(100),
  empresa: z.string().trim().min(1, "Requerido").max(100),
  giro: z.string().trim().min(1, "Requerido").max(100),
  ciudad: z.string().trim().min(1, "Requerido").max(100),
  web: z.string().trim().max(200).url("URL inválida").or(z.literal("")).optional(),
  email: z.string().trim().email("Correo inválido").max(255),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(30),
  tipoPatrocinio: z.string().min(1, "Selecciona una opción"),
  rangoInversion: z.string().min(1, "Selecciona un rango"),
  objetivo: z.string().trim().min(5, "Cuéntanos un poco más").max(1000),
  productosActivacion: z.enum(["si", "no", "talvez"], { required_error: "Selecciona una opción" }),
  aporteEspecie: z.string().trim().max(1000).optional(),
  agendarLlamada: z.boolean().default(false),
  disponibilidad: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "transition-all duration-300 border-gray-300 focus-visible:ring-hot-pink focus-visible:ring-2 focus-visible:border-hot-pink rounded-none bg-transparent";

const tipos = ["Económico", "En especie", "Activación de marca", "Asesoría"];
const rangos = [
  "$5,000 – $10,000 MXN",
  "$10,000 – $25,000 MXN",
  "$25,000 – $50,000 MXN",
  "$50,000+ MXN",
];
const horarios = ["Mañana", "Tarde", "Noche"];

export function SponsorshipForm({ onSuccess }: { onSuccess: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      agendarLlamada: false,
      disponibilidad: [],
      web: "",
    },
  });

  const agendar = watch("agendarLlamada");

  const onSubmit = async (_data: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    onSuccess();
  };

  const sectionMotion = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const Field = ({
    label,
    htmlFor,
    error,
    children,
  }: {
    label: string;
    htmlFor?: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-xs font-medium text-ink/80 tracking-wide">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-hot-pink">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
      {/* 01 */}
      <motion.section {...sectionMotion} className="space-y-6">
        <Eyebrow>01 / Datos generales</Eyebrow>
        <Field label="Nombre completo" htmlFor="nombre" error={errors.nombre?.message}>
          <Input id="nombre" {...register("nombre")} className={inputCls} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Empresa / Marca" htmlFor="empresa" error={errors.empresa?.message}>
            <Input id="empresa" {...register("empresa")} className={inputCls} />
          </Field>
          <Field label="Giro de la empresa" htmlFor="giro" error={errors.giro?.message}>
            <Input id="giro" {...register("giro")} className={inputCls} />
          </Field>
        </div>
        <Field label="Ciudad" htmlFor="ciudad" error={errors.ciudad?.message}>
          <Input id="ciudad" {...register("ciudad")} className={inputCls} />
        </Field>
        <Field label="Página web / redes sociales" htmlFor="web" error={errors.web?.message}>
          <Input id="web" type="url" placeholder="https://" {...register("web")} className={inputCls} />
        </Field>
      </motion.section>

      <div className="border-t border-gray-200" />

      {/* 02 */}
      <motion.section {...sectionMotion} className="space-y-6">
        <Eyebrow>02 / Contacto</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Correo electrónico" htmlFor="email" error={errors.email?.message}>
            <Input id="email" type="email" {...register("email")} className={inputCls} />
          </Field>
          <Field label="Teléfono / WhatsApp" htmlFor="telefono" error={errors.telefono?.message}>
            <Input id="telefono" type="tel" {...register("telefono")} className={inputCls} />
          </Field>
        </div>
      </motion.section>

      <div className="border-t border-gray-200" />

      {/* 03 */}
      <motion.section {...sectionMotion} className="space-y-8">
        <Eyebrow>03 / Interés</Eyebrow>

        <Field label="¿Qué tipo de patrocinio te interesa?" error={errors.tipoPatrocinio?.message}>
          <Controller
            control={control}
            name="tipoPatrocinio"
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(v) => v && field.onChange(v)}
                className="flex flex-wrap justify-start gap-2"
              >
                {tipos.map((t) => (
                  <ToggleGroupItem
                    key={t}
                    value={t}
                    className="rounded-full border border-hot-pink bg-transparent px-5 py-2 text-sm text-ink hover:bg-soft-pink data-[state=on]:bg-hot-pink data-[state=on]:text-white transition-all duration-300"
                  >
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
        </Field>

        <Field label="¿En qué rango de inversión te sientes cómodo?" error={errors.rangoInversion?.message}>
          <Controller
            control={control}
            name="rangoInversion"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {rangos.map((r) => {
                  const active = field.value === r;
                  return (
                    <label
                      key={r}
                      className={cn(
                        "cursor-pointer border px-4 py-4 flex items-center gap-3 transition-all duration-300",
                        active
                          ? "border-hot-pink bg-soft-pink/60"
                          : "border-gray-200 hover:border-hot-pink hover:bg-soft-pink/30"
                      )}
                    >
                      <RadioGroupItem value={r} className="border-hot-pink text-hot-pink" />
                      <span className="text-sm text-ink font-medium">{r}</span>
                    </label>
                  );
                })}
              </RadioGroup>
            )}
          />
        </Field>

        <Field label="¿Qué te gustaría lograr al participar en SENTIRTE?" htmlFor="objetivo" error={errors.objetivo?.message}>
          <Textarea
            id="objetivo"
            {...register("objetivo")}
            className={cn(inputCls, "min-h-[100px] resize-none")}
          />
          <p className="text-xs text-gray-500 italic mt-1">Ej. Branding, ventas, posicionamiento...</p>
        </Field>
      </motion.section>

      <div className="border-t border-gray-200" />

      {/* 04 */}
      <motion.section {...sectionMotion} className="space-y-8">
        <Eyebrow>04 / Logística</Eyebrow>

        <Field label="¿Tu marca cuenta con productos para activación?" error={errors.productosActivacion?.message}>
          <Controller
            control={control}
            name="productosActivacion"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-wrap gap-3"
              >
                {[
                  { v: "si", l: "Sí" },
                  { v: "no", l: "No" },
                  { v: "talvez", l: "Tal vez" },
                ].map((o) => {
                  const active = field.value === o.v;
                  return (
                    <label
                      key={o.v}
                      className={cn(
                        "cursor-pointer rounded-full border px-5 py-2 text-sm transition-all duration-300 flex items-center gap-2",
                        active
                          ? "border-hot-pink bg-hot-pink text-white"
                          : "border-hot-pink text-ink hover:bg-soft-pink"
                      )}
                    >
                      <RadioGroupItem value={o.v} className="sr-only" />
                      {o.l}
                    </label>
                  );
                })}
              </RadioGroup>
            )}
          />
        </Field>

        <Field
          label="En caso de patrocinio en especie, ¿qué podrías aportar?"
          htmlFor="aporte"
          error={errors.aporteEspecie?.message}
        >
          <Textarea
            id="aporte"
            {...register("aporteEspecie")}
            className={cn(inputCls, "min-h-[100px] resize-none")}
          />
        </Field>
      </motion.section>

      <div className="border-t border-gray-200" />

      {/* 05 */}
      <motion.section {...sectionMotion} className="space-y-6">
        <Eyebrow>05 / Siguientes pasos</Eyebrow>

        <div className="flex items-center justify-between gap-6 py-2">
          <Label htmlFor="agendar" className="text-sm text-ink">
            ¿Te gustaría agendar una llamada?
          </Label>
          <Controller
            control={control}
            name="agendarLlamada"
            render={({ field }) => (
              <Switch
                id="agendar"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-hot-pink"
              />
            )}
          />
        </div>

        <AnimatePresence initial={false}>
          {agendar && (
            <motion.div
              key="disponibilidad"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <Label className="text-xs font-medium text-ink/80 tracking-wide">
                  Disponibilidad aproximada
                </Label>
                <Controller
                  control={control}
                  name="disponibilidad"
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {horarios.map((h) => {
                        const checked = field.value?.includes(h);
                        return (
                          <label
                            key={h}
                            className={cn(
                              "cursor-pointer rounded-full border px-5 py-2 text-sm flex items-center gap-2 transition-all duration-300",
                              checked
                                ? "border-hot-pink bg-hot-pink text-white"
                                : "border-hot-pink text-ink hover:bg-soft-pink"
                            )}
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(c) => {
                                const cur = field.value ?? [];
                                field.onChange(c ? [...cur, h] : cur.filter((x) => x !== h));
                              }}
                              className="sr-only"
                            />
                            {h}
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-gray-500 italic">
          Nuestro equipo revisará tu información y te contactará en menos de 48 horas.
        </p>
      </motion.section>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-hot-pink text-white hover:bg-deep-pink py-6 text-lg font-serif italic rounded-none transition-colors duration-300"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Enviando...
          </span>
        ) : (
          "Enviar Solicitud"
        )}
      </Button>
    </form>
  );
}