import { useEffect, useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parses a 'YYYY-MM' string into { year, month } (month is 0-based). */
const parseMonth = (value) => {
    const [year, month] = value.split('-').map(Number);
    return { year, month: month - 1 };
};

/**
 * Number of months between two 'YYYY-MM' values, counting both the start and
 * end month (the same convention LinkedIn uses: Jan 2025 - Oct 2026 = 1 yr 10 mos).
 * A missing `end` means "present".
 */
export const monthsBetween = (start, end, now = new Date()) => {
    const from = parseMonth(start);
    const to = end ? parseMonth(end) : { year: now.getFullYear(), month: now.getMonth() };
    return Math.max(0, (to.year - from.year) * 12 + (to.month - from.month) + 1);
};

/** 22 -> "1 yr 10 mos" */
export const formatDuration = (totalMonths) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];
    if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
    return parts.join(' ') || '1 mo';
};

/** '2021-11' -> "Nov 2021", undefined -> "Present" */
export const formatMonth = (value) => {
    if (!value) return 'Present';
    const { year, month } = parseMonth(value);
    return `${MONTHS[month]} ${year}`;
};

/**
 * Returns `compute(new Date())`, re-evaluated on the client after mount.
 * The page is statically generated, so without this the numbers would be
 * frozen at build time and could also cause a hydration mismatch.
 */
export const useNow = (compute) => {
    const [value, setValue] = useState(() => compute(new Date()));
    useEffect(() => {
        setValue(compute(new Date()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return value;
};
