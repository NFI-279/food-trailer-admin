// src/features/settings/components/settings-form.tsx
"use client";
import { useState, useEffect } from "react";
import { useSettings, useUpdateSettings } from "../hooks";
import { SettingsInput } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Power, Clock, AlertTriangle, Globe } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { toast } from "sonner";
import { validationMessage } from "@/lib/validation-messages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export function SettingsForm() {
  const { language, setLanguage, t } = useLanguage();
  const { data: settings, isLoading, isError, error, refetch } = useSettings();
  const updateMutation = useUpdateSettings();
  const [isChangingPass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [openTime, setOpenTime] = useState(settings?.openTime || "");
  const [closeTime, setCloseTime] = useState(settings?.closeTime || "");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (settings) {
      setOpenTime(settings.openTime);
      setCloseTime(settings.closeTime);
    }
  }, [settings]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // 3. NOW we can safely do our loading check
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }
  if (isError || !settings) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-destructive">
        <p>{error instanceof Error ? error.message : "Failed to load settings."}</p>
        <Button variant="outline" className="mt-3" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  // Helper to trigger auto-save
  const handleChange = (field: keyof SettingsInput, value: SettingsInput[keyof SettingsInput]) => {
    updateMutation.mutate({ [field]: value });
  };
return (
    <div className="space-y-6 max-w-3xl">

      {/* LANGUAGE CARD */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center text-xl">
              <Globe className="mr-2 h-5 w-5 text-indigo-500" />
              {t.settings.language}
            </CardTitle>
            <CardDescription>{t.settings.languageDesc}</CardDescription>
          </div>
          <div className="w-full sm:w-[180px]">
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
        <CardHeader className="flex flex-col items-start justify-between gap-4 pb-2 sm:flex-row sm:items-center">
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
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="space-y-3">
              <Label className="text-base">{t.settings.openTime}</Label>
              <Input type="time" className="text-lg h-12" value={openTime} onChange={(e) => setOpenTime(e.target.value)} onBlur={() => handleChange("openTime", openTime)} />
            </div>
            <div className="space-y-3">
              <Label className="text-base">{t.settings.closeTime}</Label>
              <Input type="time" className="text-lg h-12" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} onBlur={() => handleChange("closeTime", closeTime)} />
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">
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
        <CardHeader className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <CardTitle className="text-xl">{t.settings.notif}</CardTitle>
            <CardDescription>{t.settings.notifDesc}</CardDescription>
          </div>
          <Switch checked={!settings.muteKitchenDing} disabled={updateMutation.isPending} onCheckedChange={(val) => handleChange("muteKitchenDing", !val)} />
        </CardHeader>
      </Card>

   {/* SECURITY CARD */}
      <Card className="border-security/30 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-security">{t.settings.securityTitle}</CardTitle>
          <CardDescription>{t.settings.securityDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!oldPassword || !newPassword) {
                setPasswordError(validationMessage(language, "passwordRequired"));
                return;
              }
              if (newPassword.length < 6) {
                setPasswordError(validationMessage(language, "passwordMin"));
                return;
              }
              setPasswordError("");
              // DEMO MODE: Polite popup instead of actual API call
              toast.info("Demo Mode: Password changes are disabled.");
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2 w-full">
              <Label>{t.settings.oldPass}</Label>
              <Input
                name="oldPass"
                type="password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-2 w-full">
              <Label>{t.settings.newPass}</Label>
              <Input
                name="newPass"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                aria-invalid={Boolean(passwordError)}
              />
            </div>
            {passwordError ? <p className="text-sm text-destructive sm:col-span-2">{passwordError}</p> : null}
            <Button type="submit" variant="outline" className="w-full border-security text-security hover:bg-security/10 sm:col-span-2 sm:ml-auto sm:w-auto" disabled={isChangingPass}>
              {isChangingPass ? t.settings.btnUpdating : t.settings.btnUpdate}
            </Button>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
}
