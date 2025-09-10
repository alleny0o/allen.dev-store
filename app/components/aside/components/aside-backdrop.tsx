interface AsideBackdropProps {
  onClose: () => void;
}

export function AsideBackdrop({onClose}: AsideBackdropProps) {
  return (
    <button
      type="button"
      aria-label="Close aside"
      className="absolute inset-0 bg-black/60"
      onClick={onClose}
      tabIndex={0}
      style={{
        all: 'unset',
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
      }}
    />
  );
}
