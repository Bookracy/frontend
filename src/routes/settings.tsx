import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { LANGUAGES } from "@/constants";
import { useSettingsStore } from "@/stores/settings";
import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { language, setLanguage, backendURL, setBackendURL } = useSettingsStore();
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-full flex-col gap-8 md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Choose between light and dark themes for the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setTheme} defaultValue={theme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Theme</SelectLabel>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Language</CardTitle>
            <CardDescription>
              Language applied to search results, and maybe, just maybe the entire application{" "}
              <span role="img" aria-label="smirk">
                😏
              </span>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend Settings</CardTitle>
            <CardDescription className="flex gap-2">
              <Lock className="h-5 w-5 text-purple-500" />
              Backend URL:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input value={backendURL} onBlur={(e) => setBackendURL(e.target.value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generate thumbnails</CardTitle>
            <CardDescription>Most of the time, books don't have thumbnails. You can enable this setting to generate them on the fly but it may slow down the page.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <Switch id="thumbnail-generation" />
            <Label htmlFor="thumbnail-generation">Enable Thumbnails generation</Label>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-[68px] right-4">
        <p className="text-gray-400">
          Hostname: <span className="text-purple-500">{window.location.hostname}</span>
        </p>
      </div>
    </div>
  );
}
