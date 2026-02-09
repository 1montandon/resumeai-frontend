<template>
  <footer class="bg-slate-100 border-t border-slate-200 mt-24">
    <div class="max-w-7xl mx-auto px-10 md:px-20 py-12">
      <!-- Top -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <img src="/public/logo.png" alt="Resume AI" class="w-4" />
            <span class="text-lg font-bold text-slate-800">Resume AI</span>
          </div>
          <p class="text-sm text-slate-600 max-w-xs">
            AI-powered resume analysis to help you stand out and land more interviews.
          </p>
        </div>

        <!-- Product -->
        <div>
          <h4 class="font-semibold text-slate-800 mb-3">Product</h4>
          <ul class="flex flex-col gap-2 text-sm">
            <li>
              <a href="#" class="text-slate-600 hover:text-blue-600 transition"> How it works </a>
            </li>
            <li>
              <a href="#" class="text-slate-600 hover:text-blue-600 transition"> Features </a>
            </li>
            <li>
              <a href="#" class="text-slate-600 hover:text-blue-600 transition"> Pricing </a>
            </li>
          </ul>
        </div>

        <!-- CTA -->
        <div class="flex flex-col gap-4">
          <h4 class="font-semibold text-slate-800">Ready to improve your resume?</h4>
          <button
            class="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition w-fit"
          >
            Analyze now
          </button>
          <p class="text-xs text-slate-500">No credit card required</p>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p class="text-sm text-slate-500">© 2026 Resume AI. All rights reserved.</p>

        <div class="flex gap-6 text-sm">
          <a href="#" class="text-slate-500 hover:text-blue-600 transition"> Privacy Policy </a>
          <a href="#" class="text-slate-500 hover:text-blue-600 transition"> Terms of Service </a>
        </div>
      </div>
    </div>
  </footer>
</template>
