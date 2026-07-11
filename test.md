Use the ids-new-component skill. I want to create a new IDS component in both React
(this repo) and Twig (design-system-twig) from this Figma design:

https://www.figma.com/design/4sbNQyNLhFFwxWDH89Rf9X/%F0%9F%9F%A2--Ibexa--Design-System?node-id=0-7376

The page contains only this one component (all its variants/sizes/states).

- Ticket: IBX-999999
- Create feature branches IBX-999999-switcher-component from ai-enhanced-work in both repos.
- Full pipeline: spec first and stop for my approval, then React implementation with
  stories and tests, visual verification against the Figma export, then the Twig
  implementation with integration tests. Also capture the Twig renders with the
  --twig flag (my DXP runs at https://localhost:8060) and show me React vs Twig side by side.
- Skip the DXP usage example for now.