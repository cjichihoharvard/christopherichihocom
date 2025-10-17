import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <div className="pt-32 px-8 space-y-8">
        <div className="h-96 bg-card rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Scroll down to see navbar effects</p>
        </div>
        <div id="about" className="h-96 bg-card rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">About Section</p>
        </div>
        <div id="journey" className="h-96 bg-card rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Journey Section</p>
        </div>
      </div>
    </div>
  );
}
