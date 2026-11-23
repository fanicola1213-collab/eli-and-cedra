# Wedding website

A one-page wedding site for July 17, 2027 at The Haven of the Wild, Chittenango, NY.
Hosted free on GitHub Pages. RSVPs are saved to a Google Sheet.

## Files
- `index.html`: the whole website.
- `apps-script.gs`: the RSVP collector you paste into a Google Sheet (instructions are inside the file).

## How the couple edits the site (no coding needed)
1. On GitHub, open `index.html` and click the pencil icon (Edit).
2. Scroll to the block marked **EDIT HERE** near the bottom.
3. Change the text inside the quotes: names, story, schedule, hotels, meals, registry links, FAQ.
   Keep the quotes and commas in place.
4. Click **Commit changes**. The live site updates within about a minute.

## Turning on RSVPs
Follow the steps at the top of `apps-script.gs`, then paste the Web app URL into
`rsvpEndpoint: ""` in the EDIT HERE block. Until then, the form runs in preview mode and saves nothing.

## Privacy
The GitHub repository is public on a free account. Never put guest lists, emails or addresses in it.
RSVP replies go only to the Google Sheet in your Google account.

## Publishing on GitHub Pages
Repository **Settings > Pages > Build and deployment**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
For a custom domain, add it under Settings > Pages > Custom domain and follow GitHub's DNS instructions.
