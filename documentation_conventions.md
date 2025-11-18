# Documentation Conventions

This document describes the naming conventions and formatting standards used throughout this documentation project.

## Table of Contents
1. [File and Directory Naming](#file-and-directory-naming)
2. [File Structure](#file-structure)
3. [Markdown Formatting](#markdown-formatting)
4. [Links and References](#links-and-references)
5. [Images and Assets](#images-and-assets)
6. [Code Examples](#code-examples)
7. [Best Practices](#best-practices)

---

## File and Directory Naming

### Directory Names
- **Use lowercase kebab-case** for all directory names
- Example: `java-se-8-lts`, `best-practices`, `interview-questions`

### File Names
- **Regular documentation files**: Use numeric prefix + lowercase kebab-case format
  - Pattern: `XXX_descriptive-file-name.md`
  - Example: `001_annotations.md`, `002_lambda-expressions.md`
  
- **Index files**: Use `index.md` (no numeric prefix)
  - Purpose: Main entry point for a directory
  - Example: `docs/java/index.md`

- **Special files**: No numeric prefix required
  - `.pages` - MkDocs navigation configuration
  - `.nojekyll` - GitHub Pages configuration
  - `README.md` - Repository documentation

### Numeric Prefix Guidelines
- Use **three-digit format** (001, 002, 003, etc.)
- Numbers indicate **display order** in documentation
- Leave gaps between numbers for future insertions (e.g., 001, 005, 010)
- Maintain consistent numbering within each directory

---

## File Structure

### Standard Document Template

```markdown
---
tags:
  - Tag1
  - Tag2
  - Tag3
---

# 1. Main Title

Brief introduction to the topic.

## 1.1. First Subsection

Content for first subsection...

## 1.2. Second Subsection

Content for second subsection...

# **References:**
1. [Source 1](https://example.com)
2. [Source 2](https://example.com)
```

### Front Matter (Optional)
```yaml
---
title: Page Title
tags:
  - Java
  - Programming
---
```

### Section Numbering
- Main sections: `# 1.`, `# 2.`, `# 3.`
- Subsections: `## 1.1.`, `## 1.2.`, `## 1.3.`
- Sub-subsections: `### 1.1.1.`, `### 1.1.2.`

### Section Titles
- Use clear, descriptive titles for all sections
- Example: `# 1. Lambda Expressions`

---

## Markdown Formatting

### Headers
```markdown
# Main Header (H1)
## Subheader (H2)
### Sub-subheader (H3)
```

### Text Emphasis
- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- ***Bold and Italic***: `***text***`

### Lists
**Unordered Lists:**
```markdown
* Item 1
* Item 2
  * Nested item
```

**Ordered Lists:**
```markdown
1. First item
2. Second item
3. Third item
```

### Code Formatting

**Inline Code:**
```markdown
Use `code` for inline code references.
```

**Code Blocks:**
````markdown
```java
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
````

**Language-Specific Highlighting:**
- Java: ` ```java `
- Python: ` ```python `
- JavaScript: ` ```javascript `
- XML: ` ```xml `
- YAML: ` ```yaml `

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Tables
```markdown
| Header 1  | Header 2  | Header 3  |
|-----------|-----------|-----------|
| Row 1     | Data      | Data      |
| Row 2     | Data      | Data      |
```

### Horizontal Rules
```markdown
---
```

---

## Links and References

### Internal Links (Within Documentation)

**Link to file in same directory:**
```markdown
[Lambda Expressions](003_lambda-expressions.md)
```

**Link to file in parent directory:**
```markdown
[Type Inference](../018_type-inference.md)
```

**Link to file in subdirectory:**
```markdown
[Java SE 8](jdk/java-se-8-lts/index.md)
```

**Link to specific directory (index file):**
```markdown
[Best Practices](best-practices/index.md)
```

### External Links

**All external links MUST open in a new tab with security attributes:**

**Correct syntax with MkDocs `attr_list` extension:**
```markdown
[Oracle Documentation](https://docs.oracle.com/javase/tutorial/){ target="_blank" rel="noopener noreferrer" }
```

**Why use `rel="noopener noreferrer"`?**
- **`noopener`** - Prevents the new page from accessing the `window.opener` property (security)
- **`noreferrer`** - Prevents passing referrer information (privacy & performance)
- **`target="_blank"`** - Opens link in a new tab

**Examples of external links:**
```markdown
[Baeldung Tutorial](https://www.baeldung.com/java-8-features){ target="_blank" rel="noopener noreferrer" }
[Wikipedia - Java](https://en.wikipedia.org/wiki/Java){ target="_blank" rel="noopener noreferrer" }
[GitHub Repository](https://github.com/example/repo){ target="_blank" rel="noopener noreferrer" }
[Oracle Docs](https://docs.oracle.com){ target="_blank" rel="noopener noreferrer" }
```

**Note:** With MkDocs `attr_list` extension, use curly braces `{ }` with spaces around attributes, NOT `{: }` syntax.

### Reference Links at End of Document

**All reference links to external sources MUST include security attributes:**

```markdown
# **References:**
1. [Baeldung - Java 8](https://www.baeldung.com/java-8-features){ target="_blank" rel="noopener noreferrer" }
2. [Oracle - Lambda Tutorial](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html){ target="_blank" rel="noopener noreferrer" }
3. [Wikipedia - Functional Programming](https://en.wikipedia.org/wiki/Functional_programming){ target="_blank" rel="noopener noreferrer" }
```

### Link Best Practices
- ✅ Always use **relative paths** for internal links
- ✅ Include **file extension** (.md) in internal links
- ✅ Use **descriptive link text** (avoid "click here")
- ✅ **ALWAYS add `{ target="_blank" rel="noopener noreferrer" }`** to external links (http://, https://)
- ✅ **NEVER add attributes** to internal documentation links
- ✅ Verify all links work before committing
- ❌ Don't use absolute paths for internal documentation
- ❌ Don't forget security attributes (`rel="noopener noreferrer"`) on external URLs
- ❌ Don't use `{: }` syntax - use `{ }` with spaces for MkDocs attr_list

---

## Images and Assets

### Image Naming Convention
- Use numeric prefix + lowercase kebab-case
- Example: `001_java-memory-model.png`

### Image Directory Structure
```
docs/
  assets/
    images/
      001_dark-logo.png
      002_light-logo.png
  java/
    other-subjects/
      images/
        001_anonymous-classes-diagram.png
        002_java-duke.png
```

### Embedding Images
```markdown
![Alt text](path/to/001_image-name.png)
```

**Example:**
```markdown
![Java Memory Model](../images/001_java-memory-model.png)
```

### Image Best Practices
- ✅ Use descriptive alt text for accessibility
- ✅ Keep images in logical directory near related content
- ✅ Use PNG for diagrams, JPG for photos
- ✅ Optimize image file sizes before committing
- ❌ Don't use spaces in image filenames

---

## Code Examples

### Format Standards
1. **Include language identifier** in code blocks
2. **Add comments** to explain complex logic
3. **Use consistent indentation** (spaces, not tabs)
4. **Keep examples concise** and focused

### Example Structure
```markdown
* **Example:**
```java
public interface FunctionalInterface {
    // Abstract method
    void execute();
    
    // Default method
    default void printMessage() {
        System.out.println("Default implementation");
    }
}
```
```

### Multi-Example Format
```markdown
**Example 1:** Basic usage
```java
// Code here
```

**Example 2:** Advanced usage
```java
// Code here
```
```

---

## Best Practices

### Content Organization
1. **Start with overview** - Brief introduction to the topic
2. **Use clear hierarchy** - Logical section numbering and nesting
3. **Include examples** - Practical code demonstrations
4. **Add references** - Link to authoritative sources
5. **Keep it concise** - Focus on essential information

### Writing Style
- ✅ Use **present tense** for descriptions
- ✅ Write in **active voice** where possible
- ✅ Use **consistent terminology** throughout
- ✅ **Define acronyms** on first use
- ✅ Include **cross-references** to related topics

### Documentation Maintenance
1. **Review links regularly** - Ensure they remain valid
2. **Update content** - Keep information current with latest versions
3. **Maintain consistency** - Follow established patterns
4. **Version control** - Commit logical changes with clear messages

### Quality Checklist
Before committing documentation:
- [ ] File names follow naming convention
- [ ] All internal links work correctly
- [ ] Code examples are tested and correct
- [ ] Images have descriptive names and alt text
- [ ] References section is complete
- [ ] Spelling and grammar checked
- [ ] Markdown renders correctly

---

## Common Patterns

### "More About" Section
```markdown
# 2. More about:
1. [Related Topic 1](../path/to/001_related-topic.md)
2. [Related Topic 2](../path/to/002_another-topic.md)
```

### Tips and Best Practices Section
```markdown
## 3. Tips:

### 3.1. First Tip
Description of the first tip...

### 3.2. Second Tip
Description of the second tip...
```

### Warning/Note Callouts
```markdown
**NOTE:** Important information to remember.

**WARNING:** Critical warning about potential issues.
```

### Referred Functionalities Section
```markdown
# 2. Referred Functionalities:
1. [Lambda Expressions](../path/to/003_lambda-expressions.md)
2. [Stream API](../path/to/003_stream-api.md)
```

---

## MkDocs-Specific Features

### Navigation File (.pages)
```yaml
title: Section Title
nav:
  - About: index.md
  - Subsection: subdirectory
  - File: 001_file-name.md
  - ...
```

### Tags
```yaml
---
tags:
  - Java
  - Programming
  - JDK
---
```

### Metadata
```yaml
---
title: Custom Page Title
description: Page description for SEO
---
```

---

## Version History

| Version | Date       | Changes                          |
|---------|------------|----------------------------------|
| 1.0     | 2025-01-18 | Initial documentation conventions|

---

## Contact & Contributions

For questions or suggestions regarding these conventions, please:
1. Open an issue in the repository
2. Submit a pull request with improvements
3. Contact the documentation maintainers

---

**Last Updated:** January 18, 2025
