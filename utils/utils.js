let meta = (title, description, url, imageUrl) => {
  return {
    title: title,
    meta: [{ name: 'title', content: title },
           { name: 'description', content: description },

           { property: 'og:type', content: 'website'},
           { property: 'og:url', content: url},
           { property: 'og:title', title },
           { property: 'og:description', content: description},
           { property: 'og:image', content: imageUrl },

           { property: 'twitter:card', content: 'summary_large_image'},
           { property: 'twitter:url', content: url},
           { property: 'twitter:title', content: title},
           { property: 'twitter:description', content: description},
           { property: 'twitter:image', content: imageUrl}]
  };
}
export { meta }
