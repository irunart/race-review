"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "ahooks";
import type {SearchRaceResult} from "@/lib/services/race/raceService";
import { RaceService } from "@/lib/services/race/raceService";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export function SearchBar({ className, autoFocus, onClose }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchRaceResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, { wait: 300 });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery) {
      const search = async () => {
        const data = await RaceService.searchRaces(debouncedQuery);
        setResults(data.slice(0, 5));
        setIsOpen(true);
      };
      search();
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索赛事..."
          className="pl-10 pr-10"
          autoFocus={autoFocus}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              onClose?.();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-auto rounded-md bg-white p-2 shadow-lg">
          {results.map((result) => (
            <button
              key={result.raceId}
              className="w-full rounded-md p-2 text-left hover:bg-gray-100"
              onClick={() => {
                router.push(`/races/${result.raceId}`);
                setQuery("");
                setIsOpen(false);
                onClose?.();
              }}
            >
              <div className="font-medium">{result.name}</div>
              <div className="text-sm text-gray-500">
                {format(new Date(result.date), 'yyyy年M月d日', { locale: zhCN })} · {result.location}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
