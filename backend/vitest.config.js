import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        testTimeout: 10000,
        hookTimeout: 20000,
        coverage: {
            provider: 'v8',
            reportsDirectory: './coverage',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.js'],
            exclude: [
                'src/index.js',
                'src/config/**',
                'src/**/*.test.js',
                'src/tests/**'
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 75,
                statements: 80
            }
        }
    }
})