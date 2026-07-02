// Swiper is loaded globally from vendor/swiper-bundle.min.js.

// Keep the static HTML section order aligned with the current live layout.
const STATIC_SECTION_ORDER = [
    'banner',
    'news',
    'featured',
    'plus',
    'cht',
    'author',
    'process',
    'qa',
];

// Prefer the order declared on the page when JSON sync has updated it.
const getSectionOrder = () => {
    const wrapperBox = document.querySelector('.wrapper-box');
    const declaredOrder = wrapperBox?.dataset.sectionOrder ?? '';

    if (!declaredOrder) return STATIC_SECTION_ORDER;

    const parsedOrder = declaredOrder
        .split(',')
        .map((sectionKey) => sectionKey.trim())
        .filter(Boolean);

    return parsedOrder.length ? parsedOrder : STATIC_SECTION_ORDER;
};

// Shared Swiper defaults used across all sliders.
const sharedSwiperOptions = {
    loop: false,
    spaceBetween: 0,
};

// Open navigational links in a new tab while preserving in-page anchors.
const applyExternalLinkTargets = (root = document) => {
    const anchors = Array.from(root.querySelectorAll('a[href]'));

    anchors.forEach((anchorElement) => {
        const rawHref = (anchorElement.getAttribute('href') ?? '').trim();

        if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:')) {
            anchorElement.removeAttribute('target');
            anchorElement.removeAttribute('rel');
            return;
        }

        anchorElement.target = '_blank';
        anchorElement.rel = 'noopener noreferrer';
    });
};

// Smooth-scroll to an in-page section while keeping it clear of the fixed header.
const scrollToSectionWithHeaderOffset = (targetSelector) => {
    const targetSection = document.querySelector(targetSelector);

    if (!targetSection) return;

    const headerElement = document.querySelector('#header');
    const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 0;
    const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
    });
};

// Reorder the main sections before the fixed CTA / footer area.
const applySectionOrder = (order = []) => {
    const wrapperBox = document.querySelector('.wrapper-box');
    const fixedPlusPlaceholder = document.querySelector('.fixed-plus-placeholder');

    if (!wrapperBox || !fixedPlusPlaceholder || !Array.isArray(order)) return;

    order.forEach((sectionKey) => {
        const sectionElement = document.querySelector(`#${sectionKey}Section`);

        if (sectionElement) {
            wrapperBox.insertBefore(sectionElement, fixedPlusPlaceholder);
        }
    });
};

// Alternate white / gray backgrounds based on the rendered section order.
const applyAlternatingSectionBackgrounds = (order = []) => {
    const alternatingSections = order.filter((sectionKey) => sectionKey !== 'banner');

    alternatingSections.forEach((sectionKey, index) => {
        const sectionElement = document.querySelector(`#${sectionKey}Section`);

        if (!sectionElement) return;

        sectionElement.classList.toggle('bg-gray', index % 2 === 1);
    });
};

// Keep all in-page anchor links aligned with the fixed header.
const setupAnchorScroll = () => {
    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

    anchorLinks.forEach((linkElement) => {
        const rawHref = (linkElement.getAttribute('href') ?? '').trim();

        linkElement.addEventListener('click', (event) => {
            if (!rawHref.startsWith('#') || rawHref === '#') return;

            event.preventDefault();
            scrollToSectionWithHeaderOffset(rawHref);
        });
    });
};

// Make CHT cards selectable so mobile users can clearly see the chosen plan.
const setupChtCardSelection = () => {
    const chtCards = Array.from(document.querySelectorAll('.cht-card'));

    if (chtCards.length === 0) return;

    const clearSelection = () => {
        chtCards.forEach((cardElement) => {
            cardElement.classList.remove('is-selected');
            cardElement.setAttribute('aria-pressed', 'false');
        });
    };

    const selectCard = (targetCard) => {
        chtCards.forEach((cardElement) => {
            const isSelected = cardElement === targetCard;

            cardElement.classList.toggle('is-selected', isSelected);
            cardElement.setAttribute('aria-pressed', String(isSelected));
        });
    };

    chtCards.forEach((cardElement) => {
        cardElement.addEventListener('click', (event) => {
            const isSelected = cardElement.classList.contains('is-selected');
            const rawHref = cardElement.getAttribute('href') ?? '';
            const isPlaceholderLink = rawHref === '' || rawHref === '#' || rawHref.startsWith('javascript:');

            if (isPlaceholderLink) {
                event.preventDefault();
            }

            if (isSelected) {
                clearSelection();
                return;
            }

            selectCard(cardElement);
        });

        cardElement.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;

            event.preventDefault();
            if (cardElement.classList.contains('is-selected')) {
                clearSelection();
                return;
            }

            selectCard(cardElement);
        });
    });
};

// Add lightweight entrance animations for key sections and cards.
const setupMotionEffects = () => {
    if (!window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('js-motion');

    const registerMotion = (selector, className) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.classList.add(className);
        });
    };

    registerMotion('#bannerLink, #bannerLinkMobile', 'motion-scale-in');
    registerMotion(
        '#newsSection .section-title, #featuredSection .section-title, #authorSection .section-title, #chtSection .section-title, #plusSection .section-title, #processSection .section-title, #qaSection .section-title',
        'motion-fade-up',
    );
    registerMotion('#authorSection .author-p, #authorSection .author-desc, #processSection img, #qaSection .qa-load-more', 'motion-fade-up');

    document.querySelectorAll(
        '#newsSection .swiper, #featuredSection .swiper, #authorSection .swiper, #chtSection .swiper, #plusSection .swiper',
    ).forEach((element) => {
        element.classList.add('motion-stagger-group');
    });

    document.querySelectorAll(
        '#newsSection .swiper-slide, #featuredSection .swiper-slide, #authorSection .swiper-slide, #chtSection .swiper-slide, #plusSection .swiper-slide, #qaSection .qa-item',
    ).forEach((element, index) => {
        element.classList.add('motion-stagger-item');
        element.style.setProperty('--motion-order', String(index % 6));
    });

    requestAnimationFrame(() => {
        document.querySelectorAll('.motion-scale-in').forEach((element) => {
            element.classList.add('is-visible');
        });
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            if (entry.target.classList.contains('motion-stagger-group')) {
                entry.target.querySelectorAll('.motion-stagger-item').forEach((itemElement) => {
                    itemElement.classList.add('is-visible');
                });
                currentObserver.unobserve(entry.target);
                return;
            }

            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.36,
        rootMargin: '0px 0px -18% 0px',
    });

    document.querySelectorAll('.motion-fade-up, .motion-stagger-group, #qaSection .motion-stagger-item').forEach((element) => {
        observer.observe(element);
    });
};

// Breakpoints for each slider section.
const newsBreakpoints = {
    0: { slidesPerView: 1.2, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2.3, spaceBetween: 20 },
    1024: { slidesPerView: 3.4, spaceBetween: 20 },
};

const featuredBreakpoints = {
    0: { slidesPerView: 1.4, spaceBetween: 20 },
    640: { slidesPerView: 1.2, spaceBetween: 20 },
    768: { slidesPerView: 2.6, spaceBetween: 20 },
    1024: { slidesPerView: 4.4, spaceBetween: 20 },
};

const authorBreakpoints = {
    0: { slidesPerView: 2.2, spaceBetween: 20 },
    640: { slidesPerView: 2.2, spaceBetween: 20 },
    768: { slidesPerView: 2.2, spaceBetween: 20 },
    1024: { slidesPerView: 3.2, spaceBetween: 20 },
};

const chtBreakpoints = {
    0: {
        slidesPerView: 1,
        spaceBetween: 20,
        grid: { rows: 3, fill: 'row' },
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
        grid: { rows: 1, fill: 'row' },
    },
    768: {
        slidesPerView: 2.2,
        spaceBetween: 20,
        grid: { rows: 1, fill: 'row' },
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 20,
        grid: { rows: 1, fill: 'row' },
    },
};

const plusBreakpoints = {
    0: {
        slidesPerView: 1.35,
        spaceBetween: 20,
        grid: { rows: 2, fill: 'row' },
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
        grid: { rows: 1, fill: 'row' },
    },
    768: {
        slidesPerView: 2.2,
        spaceBetween: 20,
        grid: { rows: 1, fill: 'row' },
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 20,
        grid: { rows: 1, fill: 'row' },
    },
};

// Keep slidesPerView from exceeding the number of available slides.
const clampSlidesPerView = (config = {}, slideCount = 0) => {
    if (!slideCount || typeof config.slidesPerView !== 'number') return config;

    return {
        ...config,
        slidesPerView: Math.min(config.slidesPerView, slideCount),
    };
};

// Create a Swiper instance within one section and bind its local controls.
const initSectionSwiper = (sectionId, swiperSelector, options = {}) => {
    const section = document.querySelector(sectionId);

    if (!section) return;

    const swiperElement = section.querySelector(swiperSelector);
    const prevButton = section.querySelector('.swiper-button-prev');
    const nextButton = section.querySelector('.swiper-button-next');
    const paginationElement = section.querySelector('.swiper-pagination');
    const slideCount = swiperElement?.querySelectorAll('.swiper-slide').length || 0;

    if (!swiperElement) return;

    const swiperConfig = {
        ...sharedSwiperOptions,
        ...options,
    };

    if (typeof swiperConfig.slidesPerView === 'number') {
        swiperConfig.slidesPerView = Math.min(swiperConfig.slidesPerView, slideCount);
    }

    if (swiperConfig.breakpoints) {
        swiperConfig.breakpoints = Object.fromEntries(
            Object.entries(swiperConfig.breakpoints).map(([breakpointKey, breakpointConfig]) => [
                breakpointKey,
                clampSlidesPerView(breakpointConfig, slideCount),
            ]),
        );
    }

    if (prevButton && nextButton) {
        swiperConfig.navigation = {
            prevEl: prevButton,
            nextEl: nextButton,
        };
    }

    if (swiperConfig.pagination && paginationElement) {
        swiperConfig.pagination = {
            ...swiperConfig.pagination,
            el: paginationElement,
        };
    }

    return new Swiper(swiperElement, swiperConfig);
};

// Keep the bottom fixed CTA from overlapping the footer area.
const setupFixedPlusBehavior = () => {
    const fixedPlus = document.querySelector('.fixed-plus');
    const fixedPlusPlaceholder = document.querySelector('.fixed-plus-placeholder');
    let lastScrollY = window.scrollY;

    const updateFixedPlusState = () => {
        if (!fixedPlus || !fixedPlusPlaceholder) return;

        const fixedPlusHeight = fixedPlus.offsetHeight;
        const placeholderBottom = fixedPlusPlaceholder.getBoundingClientRect().bottom;
        const shouldDock = placeholderBottom <= window.innerHeight;
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        const shouldHide = currentScrollY > 40 && scrollDelta > 6;
        const shouldShow = scrollDelta < -6;

        fixedPlusPlaceholder.style.height = `${fixedPlusHeight}px`;
        fixedPlus.classList.toggle('is-docked', shouldDock);
        if (shouldDock) {
            fixedPlus.classList.remove('is-hidden');
        } else if (shouldHide) {
            fixedPlus.classList.add('is-hidden');
        } else if (shouldShow) {
            fixedPlus.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
    };

    updateFixedPlusState();
    window.addEventListener('scroll', updateFixedPlusState, { passive: true });
    window.addEventListener('resize', updateFixedPlusState);

    return updateFixedPlusState;
};

// Configure "load more" behavior for the FAQ section.
const setupQaLoadMore = (onAfterExpand) => {
    const qaItems = Array.from(document.querySelectorAll('.qa-accordion .qa-item'));
    const qaLoadMoreBtn = document.querySelector('#qaLoadMoreBtn');
    const qaLoadMore = document.querySelector('.qa-load-more');
    const qaAccordion = document.querySelector('#accordionExample');
    const initialVisibleQaCount = Number(qaAccordion?.dataset.initialVisibleCount || 5);
    const qaBatchSize = Number(qaAccordion?.dataset.batchSize || 2);
    let qaVisibleCount = initialVisibleQaCount;

    const updateQaLoadMoreState = () => {
        const hasHiddenItems = qaVisibleCount < qaItems.length;

        if (qaLoadMore) {
            qaLoadMore.hidden = !hasHiddenItems;
        }
    };

    if (qaLoadMoreBtn && qaItems.length > initialVisibleQaCount) {
        qaLoadMoreBtn.addEventListener('click', () => {
            const nextItems = qaItems.slice(qaVisibleCount, qaVisibleCount + qaBatchSize);

            nextItems.forEach((item) => {
                item.classList.remove('qa-hidden');
            });

            qaVisibleCount += nextItems.length;
            updateQaLoadMoreState();

            requestAnimationFrame(() => {
                onAfterExpand?.();
            });
        });
    } else if (qaLoadMore) {
        qaLoadMore.hidden = true;
    }

    updateQaLoadMoreState();
};

// Main bootstrap sequence:
// 1. ensure the static HTML order matches the live section order
// 2. initialize sliders
// 3. bind interactions and motion effects
const initPage = () => {
    const sectionOrder = getSectionOrder();

    applySectionOrder(sectionOrder);
    applyAlternatingSectionBackgrounds(sectionOrder);

    setupAnchorScroll();

    initSectionSwiper('#news-plan-section', '.swiper-news', {
        breakpoints: newsBreakpoints,
    });

    initSectionSwiper('#featured-plan-section', '.swiper-featured', {
        breakpoints: featuredBreakpoints,
    });

    initSectionSwiper('#author-plan-section', '.swiper-author', {
        breakpoints: authorBreakpoints,
        pagination: {
            clickable: true,
        },
    });

    initSectionSwiper('#cht-plan-section', '.swiper-cht', {
        breakpoints: chtBreakpoints,
    });

    setupChtCardSelection();

    initSectionSwiper('#plus-plan-section', '.swiper-plus', {
        breakpoints: plusBreakpoints,
    });

    const updateFixedPlusState = setupFixedPlusBehavior();
    setupQaLoadMore(updateFixedPlusState);
    applyExternalLinkTargets();
    setupMotionEffects();
};

initPage();
