import {useRef} from 'react';
import {cn} from '~/lib/utils';

import {useLocaleSelector} from '../hooks/use-locale-selector';
import {useLocaleSelectorContext} from '../context/locale-selector-context';
import {LocaleTrigger} from './locale-trigger';
import {LocaleForm} from './locale-form';
import {LocaleDropdown} from './locale-dropdown';
import {LocaleModal, useLocaleModal} from './locale-modal';
import {LocaleSidebar, useLocaleSidebar} from './locale-sidebar';

import type {LocaleSelectorProps, SelectorMode, DisplayMode} from '../types';

// ============================================================================
// HELPERS
// ============================================================================

function getResponsiveClasses(
  displayMode: DisplayMode,
  targetMode: SelectorMode,
): string {
  if (displayMode.kind === 'single') {
    return displayMode.mode === targetMode ? 'block' : 'hidden';
  }

  const {base, sm, md, lg} = displayMode;

  const resolved = {
    base,
    sm: sm ?? base,
    md: md ?? sm ?? base,
    lg: lg ?? md ?? sm ?? base,
  };

  const visibleAt = {
    base: resolved.base === targetMode,
    sm: resolved.sm === targetMode,
    md: resolved.md === targetMode,
    lg: resolved.lg === targetMode,
  };

  const classes: string[] = [];

  classes.push(visibleAt.base ? 'block' : 'hidden');

  if (visibleAt.sm !== visibleAt.base) {
    classes.push(visibleAt.sm ? 'sm:block' : 'sm:hidden');
  }

  if (visibleAt.md !== visibleAt.sm) {
    classes.push(visibleAt.md ? 'md:block' : 'md:hidden');
  }

  if (visibleAt.lg !== visibleAt.md) {
    classes.push(visibleAt.lg ? 'lg:block' : 'lg:hidden');
  }

  return classes.join(' ');
}

// ============================================================================
// INNER COMPONENTS
// ============================================================================

function DropdownSelector({config, inMobileMenu}: LocaleSelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {isOpen, toggle, close} = useLocaleSelectorContext();
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <div className="relative">
      <LocaleTrigger
        ref={triggerRef}
        variant={config.triggerVariant}
        showChevron={config.showChevron}
        locale={currentLocale}
        isOpen={isOpen}
        onClick={toggle}
      />
      <LocaleDropdown
        isOpen={isOpen}
        onClose={close}
        triggerRef={triggerRef}
        forceUpward={inMobileMenu}
      >
        <LocaleForm
          currentLocale={currentLocale}
          locales={locales}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          availableLanguages={availableLanguages}
          handleLocaleChange={handleLocaleChange}
          onClose={close}
        />
      </LocaleDropdown>
    </div>
  );
}

function ModalSelector({config}: LocaleSelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {isOpen, toggle, close} = useLocaleModal();
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <>
      <LocaleTrigger
        ref={triggerRef}
        variant={config.triggerVariant}
        showChevron={config.showChevron}
        locale={currentLocale}
        isOpen={isOpen}
        onClick={toggle}
      />
      <LocaleModal modalConfig={config.modalConfig}>
        <LocaleForm
          currentLocale={currentLocale}
          locales={locales}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          availableLanguages={availableLanguages}
          handleLocaleChange={handleLocaleChange}
          onClose={close}
        />
      </LocaleModal>
    </>
  );
}

function SidebarSelector({config}: LocaleSelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {isOpen, toggle, close} = useLocaleSidebar();
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <>
      <LocaleTrigger
        ref={triggerRef}
        variant={config.triggerVariant}
        showChevron={config.showChevron}
        locale={currentLocale}
        isOpen={isOpen}
        onClick={toggle}
      />
      <LocaleSidebar sidebarConfig={config.sidebarConfig}>
        <LocaleForm
          currentLocale={currentLocale}
          locales={locales}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          availableLanguages={availableLanguages}
          handleLocaleChange={handleLocaleChange}
          onClose={close}
        />
      </LocaleSidebar>
    </>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LocaleSelector({
  config,
  inMobileMenu = false,
}: LocaleSelectorProps) {
  if (inMobileMenu) {
    return <DropdownSelector config={config} inMobileMenu={true} />;
  }

  const {displayMode} = config;

  if (displayMode.kind === 'single') {
    if (displayMode.mode === 'modal') return <ModalSelector config={config} />;
    if (displayMode.mode === 'sidebar')
      return <SidebarSelector config={config} />;
    return <DropdownSelector config={config} />;
  }

  const dropdownClasses = getResponsiveClasses(displayMode, 'dropdown');
  const modalClasses = getResponsiveClasses(displayMode, 'modal');
  const sidebarClasses = getResponsiveClasses(displayMode, 'sidebar');

  return (
    <>
      <div className={cn(dropdownClasses)}>
        <DropdownSelector config={config} />
      </div>
      <div className={cn(modalClasses)}>
        <ModalSelector config={config} />
      </div>
      <div className={cn(sidebarClasses)}>
        <SidebarSelector config={config} />
      </div>
    </>
  );
}
