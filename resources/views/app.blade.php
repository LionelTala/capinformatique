<!DOCTYPE html>
<html lang="fr-CM" translate="no">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="google" content="notranslate" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}" />

        <!-- Favicons -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/manifest.json" />

        <!-- Article Schema (pour les pages d'activités) -->
        @yield('schema_article')

        <!-- Preconnect pour les ressources externes -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://www.googletagmanager.com">

        <!-- Polices -->
        @fonts

        <!-- Vite -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])

        <!-- Inertia Head -->
        @inertiaHead

        <!-- Scripts de suivi (Google Analytics) -->
        @if(config('app.env') === 'production')
            <script async src="https://www.googletagmanager.com/gtag/js?id={{ env('GA_MEASUREMENT_ID') }}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '{{ env('GA_MEASUREMENT_ID') }}');
            </script>
        @endif
    </head>
    <body class="font-sans antialiased notranslate">
        <!-- Google Tag Manager (noscript) -->
        @if(config('app.env') === 'production')
            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id={{ env('GTM_ID') }}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
            </noscript>
        @endif

        @inertia
    </body>
</html>
