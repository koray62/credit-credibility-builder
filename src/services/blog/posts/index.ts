
// Main export file for all blog posts
import { krediNotuNedirPost } from './krediNotuNedir';
import { hicKrediKullanmadimPost } from './hicKrediKullanmadim';
import { genclerIcinFinansalOkuryazarlikPost } from './genclerIcinFinansalOkuryazarlik';
import { additionalBlogPosts } from './additionalPosts';

// Export all blog posts as a single object
export const allBlogPosts = {
  "kredi-notu-nedir": krediNotuNedirPost,
  "hic-kredi-kullanmadim": hicKrediKullanmadimPost,
  "gencler-icin-finansal-okuryazarlik": genclerIcinFinansalOkuryazarlikPost,
  ...additionalBlogPosts
};
