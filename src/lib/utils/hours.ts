import type { OpeningHours } from "@/types";

export const defaultOpeningHours: OpeningHours = {
  days: [1, 2, 3, 4, 5, 6], // segunda a sabado
  morning: { start: "07:00", end: "11:00" },
  afternoon: { start: "14:00", end: "18:00" },
};

const TIMEZONE = "America/Fortaleza"; // horario de Sao Luis/MA (UTC-3, sem horario de verao)

function nowInStoreTZ(): Date {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return new Date(
    Number(get("year")),
    Number(get("month")) - 1,
    Number(get("day")),
    Number(get("hour")),
    Number(get("minute")),
    Number(get("second"))
  );
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export interface StoreStatus {
  isOpen: boolean;
  label: string;
  nextChange: string;
}

export function getStoreStatus(hours: OpeningHours = defaultOpeningHours): StoreStatus {
  const now = nowInStoreTZ();
  const day = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const isBusinessDay = hours.days.includes(day);
  const morningRange = [toMinutes(hours.morning.start), toMinutes(hours.morning.end)];
  const afternoonRange = [toMinutes(hours.afternoon.start), toMinutes(hours.afternoon.end)];

  const openNow =
    isBusinessDay &&
    ((minutesNow >= morningRange[0] && minutesNow < morningRange[1]) ||
      (minutesNow >= afternoonRange[0] && minutesNow < afternoonRange[1]));

  if (openNow) {
    const closingSoon = minutesNow < morningRange[1] ? hours.morning.end : hours.afternoon.end;
    return {
      isOpen: true,
      label: "Aberto agora",
      nextChange: `Fecha às ${closingSoon}`,
    };
  }

  // Descobre o proximo horario de abertura
  let cursorDay = day;
  let daysAhead = 0;
  while (daysAhead < 8) {
    const isToday = daysAhead === 0;
    const candidateStarts = [hours.morning.start, hours.afternoon.start].filter((start) => {
      if (!hours.days.includes(cursorDay)) return false;
      if (!isToday) return true;
      return toMinutes(start) > minutesNow;
    });

    if (candidateStarts.length > 0) {
      const nextStart = candidateStarts.sort((a, b) => toMinutes(a) - toMinutes(b))[0];
      const dayLabel = isToday ? "hoje" : diasSemana[cursorDay];
      return {
        isOpen: false,
        label: "Fechado agora",
        nextChange: `Abre ${dayLabel} às ${nextStart}`,
      };
    }

    cursorDay = (cursorDay + 1) % 7;
    daysAhead += 1;
  }

  return { isOpen: false, label: "Fechado agora", nextChange: "Consulte nosso horário" };
}

export const diasSemana = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
