# Current Task: Update RaceCard UI

Task: Add display of raceItems, raceScale, and raceGrade to the RaceCard component

[X] Add new props to RaceCard interface
[X] Update UI to display new fields
[X] Test the changes - Implemented with appropriate badge variants

# Lessons
- Badge component import path should be "@/components/ui/badge" (lowercase)
- When checking for distance, also check if it's not 0 to avoid showing 0km badge
- For difficulty badge, use "destructive" variant for high difficulty instead of "warning"
- Use different badge variants to create visual hierarchy in the UI
