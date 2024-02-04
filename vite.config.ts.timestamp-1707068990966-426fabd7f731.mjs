// vite.config.ts
import { defineConfig } from "file:///home/pfigueiredo/git/personal/use-safe-local-storage/node_modules/.pnpm/vite@5.0.12_@types+node@20.11.16/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import react from "file:///home/pfigueiredo/git/personal/use-safe-local-storage/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.0.12/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///home/pfigueiredo/git/personal/use-safe-local-storage/node_modules/.pnpm/vite-plugin-dts@3.7.2_@types+node@20.11.16_typescript@5.3.3_vite@5.0.12/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/home/pfigueiredo/git/personal/use-safe-local-storage";
var vite_config_default = defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js"
      },
      external: ["react", "react/jsx-runtime"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wZmlndWVpcmVkby9naXQvcGVyc29uYWwvdXNlLXNhZmUtbG9jYWwtc3RvcmFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcGZpZ3VlaXJlZG8vZ2l0L3BlcnNvbmFsL3VzZS1zYWZlLWxvY2FsLXN0b3JhZ2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcGZpZ3VlaXJlZG8vZ2l0L3BlcnNvbmFsL3VzZS1zYWZlLWxvY2FsLXN0b3JhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgZHRzKHsgaW5jbHVkZTogWydsaWInXSB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgY29weVB1YmxpY0RpcjogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdsaWIvbWFpbi50cycpLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgIH0sXG4gICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC9qc3gtcnVudGltZSddLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFBQSxFQUM1QyxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3ZDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxVQUFVLENBQUMsU0FBUyxtQkFBbUI7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
