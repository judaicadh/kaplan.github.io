import { defineConfig } from 'astro/config';

export default defineConfig({
  build: {
    async getStaticPaths() {
      const items = await fetch('/items.json').then(res => res.json());
      return items.rows.map(item => ({ params: { uuid: item.THING_UUID }}));
    }
  }
});