// src/features/settings/components/settings-form.tsx
"use client";
import { useState, useEffect } from "react";
import { useSettings, useUpdateSettings } from "../hooks";
import { authApi } from "@/features/auth/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Power, Clock, AlertTriangle, Globe } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export function SettingsForm() {
  const { language, setLanguage, t } = useLanguage();
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();
  const [isChangingPass, setIsChangingPass] = useState(false);

  const [openTime, setOpenTime] = useState(settings?.openTime || "");
  const [closeTime, setCloseTime] = useState(settings?.closeTime || "");

  // 2. When settings finally load from the database, update the states!
  useEffect(() => {
    if (settings) {
      setOpenTime(settings.openTime);
      setCloseTime(settings.closeTime);
    }
  }, [settings]);

  // 3. NOW we can safely do our loading check
  if (isLoading || !settings) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  // Helper to trigger auto-save
  const handleChange = (field: keyof typeof settings, value: any) => {
    updateMutation.mutate({ [field]: value });
  };
return (
    <div className="space-y-6 max-w-3xl">

      {/* LANGUAGE CARD */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center text-xl">
              <Globe className="mr-2 h-5 w-5 text-indigo-500" />
              {t.settings.language}
            </CardTitle>
            <CardDescription>{t.settings.languageDesc}</CardDescription>
          </div>
          <div className="w-[180px]">
            <Select value={language} onValueChange={(val) => { if (val === "en" || val === "ro") setLanguage(val); }}>
              <SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ro">🇷🇴 Română</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>
      
      {/* KILL SWITCH CARD */}
      <Card className={!settings.isAcceptingOrders ? "border-destructive shadow-sm" : "shadow-sm"}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="flex items-center text-xl">
              <Power className={`mr-2 h-5 w-5 ${settings.isAcceptingOrders ? 'text-green-500' : 'text-destructive'}`} />
              {t.settings.accepting}
            </CardTitle>
            <CardDescription>{t.settings.acceptingDesc}</CardDescription>
          </div>
          <Switch 
            className="scale-125"
            checked={settings.isAcceptingOrders} 
            disabled={updateMutation.isPending}
            onCheckedChange={(val) => handleChange("isAcceptingOrders", val)} 
          />
        </CardHeader>
        {!settings.isAcceptingOrders && (
          <CardContent>
            <div className="flex items-center mt-2 text-sm text-destructive font-bold bg-destructive/10 p-3 rounded-md">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {t.settings.closedAlert}
            </div>
          </CardContent>
        )}
      </Card>

      {/* BUSINESS HOURS CARD */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Clock className="mr-2 h-5 w-5 text-blue-500" />
            {t.settings.hours}
          </CardTitle>
          <CardDescription>{t.settings.hoursDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-base">{t.settings.openTime}</Label>
              <Input type="time" className="text-lg h-12" value={openTime} onChange={(e) => setOpenTime(e.target.value)} onBlur={() => handleChange("openTime", openTime)} />
            </div>
            <div className="space-y-3">
              <Label className="text-base">{t.settings.closeTime}</Label>
              <Input type="time" className="text-lg h-12" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} onBlur={() => handleChange("closeTime", closeTime)} />
            </div>
          </div>

          <div className="pt-4 border-t flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-bold">{t.settings.override}</Label>
              <p className="text-sm text-muted-foreground">{t.settings.overrideDesc}</p>
            </div>
            <Switch checked={settings.overrideOpen} disabled={updateMutation.isPending} onCheckedChange={(val) => handleChange("overrideOpen", val)} />
          </div>
        </CardContent>
      </Card>

      {/* NOTIFICATIONS CARD */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">{t.settings.notif}</CardTitle>
            <CardDescription>{t.settings.notifDesc}</CardDescription>
          </div>
          <Switch checked={!settings.muteKitchenDing} disabled={updateMutation.isPending} onCheckedChange={(val) => handleChange("muteKitchenDing", !val)} />
        </CardHeader>
      </Card>

   {/* SECURITY CARD */}
      <Card className="shadow-sm border-destructive/20">
        <CardHeader>
          <CardTitle className="text-xl text-destructive">{t.settings.securityTitle}</CardTitle>
          <CardDescription>{t.settings.securityDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              setIsChangingPass(true);
              const form = e.target as HTMLFormElement;
              const oldPass = (form.elements.namedItem('oldPass') as HTMLInputElement).value;
              const newPass = (form.elements.namedItem('newPass') as HTMLInputElement).value;
              
              try {
                await authApi.changePassword(oldPass, newPass);
                toast.success(t.settings.passSuccess);
                form.reset();
              } catch (err: any) {
                toast.error(err.message || t.settings.passFail);
              } finally {
                setIsChangingPass(false);
              }
            }}
            className="flex flex-col sm:flex-row gap-4 items-end"
          >
            <div className="space-y-2 w-full">
              <Label>{t.settings.oldPass}</Label>
              <Input name="oldPass" type="password" required />
            </div>
            <div className="space-y-2 w-full">
              <Label>{t.settings.newPass}</Label>
              <Input name="newPass" type="password" required minLength={6} />
            </div>
            <Button type="submit" variant="destructive" disabled={isChangingPass}>
              {isChangingPass ? t.settings.btnUpdating : t.settings.btnUpdate}
            </Button>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
}