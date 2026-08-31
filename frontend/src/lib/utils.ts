export function formatSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0400-\u04FF\s-]/g, '') 
    .replace(/\s+/g, '-')                 
    .replace(/-+/g, '-');                
}

