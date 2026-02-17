---
description: Methodology for analyzing complex business logic using Decision Trees to identify edge cases and resolve ambiguity.
---

# Use Case Analyst Workflow (Decision Tree Method)

Use this workflow when the User asks to analyze logic, check for edge cases, or when adding a feature with complex interactions. This method uses **Decision Trees** to map out every possible path and outcome.

## 1. Define the Scope (The Root)
Identify the **Trigger Event** that initiates the flow. This is the root of your decision tree.
*   **Trigger**: What happens? (e.g., "User deletes a connection", "Timer expires", "Student joins class").
*   **Actors**: Who can pull the trigger? (Student, Teacher, Admin, System).
*   **Target**: What entity is affected? (Connection, Class, Task).

## 2. Construct the Decision Tree
Map out the logic flow branching by **State** and **Context**. Use the following structure to ask questions at each node:

### Node 1: State of the Entity
*   *Branch A*: Is it **Pending**?
*   *Branch B*: Is it **Active/Accepted**?
*   *Branch C*: Is it **Archived/Rejected**?

### Node 2: Actor Context (Who is acting?)
*   *Branch A*: Actor == **Initiator** (Self-action).
*   *Branch B*: Actor == **Target** (Reaction).
*   *Branch C*: Actor == **Third Party** (Admin/System).

### Node 3: Dependent Data (The "Cascade")
*   *Branch A*: **Has Children?** (e.g., Student has Grades?).
*   *Branch B*: **No Children?** (Clean slate).

## 3. Visualize the Leaves (Outcomes)
For every end branch, define the **Outcome**.
*   **Action**: Update DB, Send Notification, Delete Record.
*   **Feedback**: Show Toast, Email, Silent.

**Example Tree (Connection Deletion):**
```mermaid
graph TD
    A[Trigger: Delete Connection] --> B{Status?}
    B -- Pending --> C{Who is Acting?}
    C -- Initiator --> D[Outcome: CANCEL (Silent Delete)]
    C -- Target --> E[Outcome: REJECT (Notify Initiator)]
    
    B -- Accepted --> F{Has Academic Data?}
    F -- Yes --> G[Outcome: ARCHIVE (Soft Delete + Linked Class Update)]
    F -- No --> H[Outcome: UNLINK (Notify + Hard Delete?)]
```

## 4. Gap Analysis (Pruning the Tree)
Review the code to see if every branch is covered.
*   **Missing Branch**: Code handles "Active" but ignores "Pending".
*   **Dead Leaf**: A branch exists but has no defined outcome (e.g., "Else { return }").
*   **Conflicting Leaf**: Two branches lead to contradictory outcomes.

## 5. User Clarification
Present the Tree to the User, highlighting **Undefined Leaves**.

**OUTPUT TO USER**:
1.  **The Decision Tree**: Text or Mermaid diagram description.
2.  **CRITICAL QUESTIONS**:
    *   "In the branch where [State=Accepted] AND [Has Data=True], should we [Archive] or [Delete]?"
    *   "In the branch where [Actor=System], do we send a notification?"

## 6. Implementation
Translate the Decision Tree directly into code:
*   **IF/ELSE Chains** in Frontend/Backend.
*   **CASE/WHEN** logic in SQL Triggers.
