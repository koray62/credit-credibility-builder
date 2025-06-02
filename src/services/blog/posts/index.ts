
// Main export file for all blog posts
import { krediNotuNedirPost } from './krediNotuNedir';
import { hicKrediKullanmadimPost } from './hicKrediKullanmadim';
import { genclerIcinFinansalOkuryazarlikPost } from './genclerIcinFinansalOkuryazarlik';
import { finansalDisiplinPost } from './finansalDisiplin';
import { evHanimlariIcinRehberPost } from './evHanimlariIcinRehber';
import { additionalBlogPosts } from './additionalPosts';

// Export all blog posts as a single object
// Note: additionalBlogPosts comes first so that individual posts can override any duplicates
export const allBlogPosts = {
  ...additionalBlogPosts,
  "kredi-notu-nedir": krediNotuNedirPost,
  "hic-kredi-kullanmadim": hicKrediKullanmadimPost,
  "gencler-icin-finansal-okuryazarlik": genclerIcinFinansalOkuryazarlikPost,
  "finansal-disiplin": finansalDisiplinPost,
  "ev-hanimlari-icin-rehber": evHanimlariIcinRehberPost
};
