import { Inquiry } from "../types";

export interface FormattedRequirementRow {
  section: string;
  label: string;
  value: string;
}

/**
 * Parses any inquiry requirements string into clean, structured table rows.
 * Handles both new multi-line format, bullet points, and older pipe-delimited strings.
 */
export function parseInquiryToRows(inq: Inquiry): FormattedRequirementRow[] {
  const rows: FormattedRequirementRow[] = [];
  const reqs = inq.special_requirements || "";

  // 1. Primary Client & Trip Meta
  if (inq.departure_city) {
    rows.push({
      section: "Travel & Location",
      label: "Departure City / Hometown",
      value: inq.departure_city
    });
  }

  if (inq.travel_date) {
    rows.push({
      section: "Travel & Location",
      label: "Expected Travel Date / Timeline",
      value: inq.travel_date
    });
  }

  if (inq.stay_duration) {
    rows.push({
      section: "Travel & Location",
      label: "Stay Duration",
      value: inq.stay_duration
    });
  }

  if (inq.num_travelers) {
    rows.push({
      section: "Travelers & Pax",
      label: "Total Travelers / Persons",
      value: `${inq.num_travelers} Person(s)`
    });
  }

  if (inq.budget_per_person) {
    rows.push({
      section: "Budget & Quotation",
      label: "Client Estimated Budget",
      value: inq.budget_per_person
    });
  }

  // 2. Parse special_requirements if present
  if (reqs) {
    if (reqs.includes("\n") || reqs.includes("•") || reqs.includes("===")) {
      let currentSection = inq.inquiry_type === "overseas_visa" 
        ? "Visa & Trade Specifications" 
        : inq.inquiry_type === "umrah_custom" 
        ? "Umrah Package Specifications" 
        : "Detailed Requirements";

      const lines = reqs.split("\n").map(l => l.trim()).filter(Boolean);

      for (const line of lines) {
        if (line.startsWith("===") && line.endsWith("===")) {
          currentSection = line.replace(/===/g, "").trim();
          continue;
        }

        if (line.endsWith(":") && !line.startsWith("•") && !line.includes("Notes:")) {
          currentSection = line.replace(/[:]/g, "").trim();
          continue;
        }

        if (line.startsWith("•") || line.includes(":")) {
          const clean = line.replace(/^[•\-\*]\s*/, "");
          const colonIdx = clean.indexOf(":");
          if (colonIdx > -1) {
            const key = clean.slice(0, colonIdx).trim();
            const val = clean.slice(colonIdx + 1).trim();
            if (key && val) {
              // Avoid duplicate rows if already captured above
              if (rows.some(r => r.label.toLowerCase() === key.toLowerCase() && r.value.toLowerCase() === val.toLowerCase())) {
                continue;
              }
              rows.push({ section: currentSection, label: key, value: val });
              continue;
            }
          }
          rows.push({ section: currentSection, label: "Detail", value: clean });
          continue;
        }

        rows.push({ section: currentSection, label: "Note", value: line });
      }
    } else if (reqs.includes(" | ")) {
      // Pipe-delimited (like legacy Umrah submissions)
      const parts = reqs.split(" | ").map(p => p.trim()).filter(Boolean);
      for (const part of parts) {
        const colonIdx = part.indexOf(":");
        if (colonIdx > -1) {
          const key = part.slice(0, colonIdx).trim();
          const val = part.slice(colonIdx + 1).trim();
          rows.push({ section: "Service Requirements", label: key, value: val });
        } else {
          rows.push({ section: "Service Requirements", label: "Specification", value: part });
        }
      }
    } else {
      rows.push({ section: "Client Notes", label: "Requirement Details", value: reqs });
    }
  }

  // 3. Document attachment note
  if (inq.passport_image_url) {
    rows.push({
      section: "Document Verification",
      label: "Official Document Attached",
      value: "Yes - Verified Customer Document / Passport on file"
    });
  }

  return rows;
}
