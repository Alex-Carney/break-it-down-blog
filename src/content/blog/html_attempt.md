---
title: 'HTML Attempt'
description: 'A primer for leaders on adopting AI technologies'
pubDate: 'Feb 1 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
---


   <style>
        :root {
            --dartmouth-green: #00693e;
            --dark-green: #004d2e;
            --teal: #0d9488;
            --dark-teal: #0f766e;
            --navy: #1e3a5f;
            --dark-navy: #0f172a;
            --blue: #2563eb;
            --light-blue: #dbeafe;
            --slate: #475569;
            --light-slate: #f1f5f9;
            --gray: #6b7280;
            --light-gray: #f9fafb;
            --white: #ffffff;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 11pt; line-height: 1.6; color: var(--slate);
            max-width: 8.5in; margin: 0 auto; padding: 0.5in; background: var(--white);
        }
        .brand { color: var(--dartmouth-green); font-size: 12pt; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
        .tagline { color: var(--gray); font-size: 10pt; margin-bottom: 24px; }
        h1 { font-size: 28pt; color: var(--dark-navy); font-weight: 700; line-height: 1.2; margin-bottom: 8px; }
        .subtitle { font-size: 14pt; color: var(--slate); margin-bottom: 20px; }
        .divider { width: 80px; height: 4px; background: linear-gradient(90deg, var(--dartmouth-green), var(--teal)); margin: 20px 0; }

        /* Updated section styling */
        .section-header {
            margin-top: 48px;
            border-top: 2px solid var(--light-slate);
            padding-top: 24px;
        }
        .section-label { 
            color: var(--dartmouth-green); 
            font-size: 10pt; 
            font-weight: 700; 
            letter-spacing: 1px; 
            margin-bottom: 4px;
            text-transform: uppercase;
        }
        h2 { font-size: 18pt; color: var(--dark-navy); font-weight: 700; margin-bottom: 16px; }
        h3 { font-size: 12pt; color: var(--teal); font-weight: 700; margin-top: 20px; margin-bottom: 10px; }
        h4 { font-size: 11pt; color: var(--dark-navy); font-weight: 600; margin-top: 16px; margin-bottom: 8px; }
        p { margin-bottom: 12px; text-align: justify; }
        
        .insight-box { background: linear-gradient(135deg, #e6f4f0 0%, #e8f5f3 100%); border-left: 4px solid var(--dartmouth-green); padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .insight-box.blue { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left-color: var(--blue); }
        .insight-box.teal { background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border-left-color: var(--teal); }
        .insight-label { font-weight: 700; color: var(--dark-navy); display: inline; }
        
        .definition-box { background: var(--light-gray); border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0; }
        .definition-term { font-weight: 700; color: var(--dartmouth-green); font-size: 11pt; }
        .definition-text { color: var(--slate); margin-top: 4px; }
        .definition-text p { margin-bottom: 8px; }
        .definition-text p:last-child { margin-bottom: 0; }
        
        .stats-row { display: flex; gap: 16px; margin: 24px 0; flex-wrap: wrap; }
        .stat-box { flex: 1; min-width: 140px; background: var(--light-gray); border-radius: 8px; padding: 16px; text-align: center; }
        .stat-number { font-size: 24pt; font-weight: 700; color: var(--dartmouth-green); }
        .stat-number.red { color: #dc2626; }
        .stat-number.blue { color: var(--blue); }
        .stat-number.teal { color: var(--teal); }
        .stat-label { font-size: 9pt; color: var(--gray); margin-top: 4px; }
        
        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10pt; }
        th { background: var(--dark-navy); color: var(--white); padding: 10px 12px; text-align: left; font-weight: 600; }
        th.green { background: var(--dartmouth-green); }
        th.red { background: #dc2626; }
        th.teal { background: var(--teal); }
        th.blue { background: var(--blue); }
        td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
        tr:nth-child(even) { background: var(--light-gray); }
        .table-caption { font-size: 9pt; color: var(--gray); text-align: center; font-style: italic; margin-top: 8px; margin-bottom: 16px; }
        
        .diagram { background: var(--light-gray); border-radius: 12px; padding: 24px; margin: 20px 0; }
        .diagram-title { font-weight: 700; color: var(--dark-navy); text-align: center; margin-bottom: 16px; font-size: 11pt; }
        
        .timeline { display: flex; justify-content: space-between; position: relative; padding: 20px 0; }
        .timeline::before { content: ''; position: absolute; top: 50%; left: 5%; right: 5%; height: 4px; background: linear-gradient(90deg, var(--dartmouth-green), var(--teal), var(--blue), var(--navy)); transform: translateY(-50%); border-radius: 2px; }
        .timeline-item { text-align: center; position: relative; z-index: 1; flex: 1; }
        .timeline-dot { width: 20px; height: 20px; border-radius: 50%; margin: 0 auto 12px; border: 3px solid var(--white); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .timeline-year { font-weight: 700; color: var(--dark-navy); font-size: 11pt; }
        .timeline-label { font-weight: 600; color: var(--teal); font-size: 9pt; margin-top: 4px; }
        .timeline-desc { font-size: 8pt; color: var(--gray); margin-top: 2px; }
        
        .stack { display: flex; flex-direction: column; gap: 8px; }
        .stack-layer { border-radius: 8px; padding: 14px 16px; color: var(--white); display: flex; justify-content: space-between; align-items: center; }
        .stack-layer.applications { background: var(--dartmouth-green); }
        .stack-layer.data { background: var(--teal); }
        .stack-layer.models { background: var(--blue); }
        .stack-layer.compute { background: var(--navy); }
        .stack-name { font-weight: 700; font-size: 11pt; }
        .stack-desc { font-size: 9pt; opacity: 0.9; }
        .stack-examples { font-size: 8pt; opacity: 0.8; text-align: right; }
        
        .spectrum { display: flex; gap: 4px; margin: 16px 0; }
        .spectrum-item { flex: 1; text-align: center; padding: 12px 8px; border-radius: 8px; color: var(--white); }
        .spectrum-item.level1 { background: var(--dartmouth-green); }
        .spectrum-item.level2 { background: var(--teal); }
        .spectrum-item.level3 { background: var(--blue); }
        .spectrum-item.level4 { background: var(--navy); }
        .spectrum-item.level5 { background: #7c3aed; }
        .spectrum-num { font-size: 16pt; font-weight: 700; }
        .spectrum-name { font-size: 8pt; font-weight: 600; margin-top: 4px; }
        
        .citation { color: var(--dartmouth-green); font-size: 9pt; vertical-align: super; font-weight: 600; }
        ul { margin: 12px 0; padding-left: 20px; }
        li { margin-bottom: 8px; }
        
        .red-flag { background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px 16px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .red-flag-title { font-weight: 700; color: #dc2626; }
        
        .example-box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 14px; margin: 12px 0; }
        .example-label { font-size: 9pt; font-weight: 700; color: var(--blue); margin-bottom: 6px; }
        
        .page-break { page-break-after: always; margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 9pt; color: var(--gray); text-align: center; }
        
        .toc-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #d1d5db; }
        .toc-section { font-weight: 600; color: var(--dark-navy); }
        
        .author-info { margin-top: 32px; font-size: 10pt; }
        .author-name { font-weight: 700; color: var(--dark-navy); }
        .author-credentials { color: var(--gray); font-size: 9pt; }
        
        .checklist { list-style: none; padding-left: 0; }
        .checklist li { padding-left: 28px; position: relative; margin-bottom: 12px; }
        .checklist li::before { content: '☐'; position: absolute; left: 0; color: var(--dartmouth-green); font-size: 14pt; }
        
        .reference { font-size: 9pt; margin-bottom: 8px; padding-left: 24px; text-indent: -24px; }
        .ref-num { color: var(--dartmouth-green); font-weight: 700; }
        
        /* Technology cards for the toolbox section */
        .tech-card {
            background: var(--white);
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin: 16px 0;
            border-left: 4px solid var(--dartmouth-green);
        }
        .tech-card.ml { border-left-color: var(--teal); }
        .tech-card.llm { border-left-color: var(--blue); }
        .tech-card.genai { border-left-color: var(--navy); }
        .tech-card.agents { border-left-color: #7c3aed; }
        .tech-card.rpa { border-left-color: #f59e0b; }
        .tech-card.idp { border-left-color: #ec4899; }
        
        .tech-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        .tech-card-title {
            font-weight: 700;
            font-size: 13pt;
            color: var(--dark-navy);
        }
        .tech-card-maturity {
            font-size: 8pt;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 4px;
            text-transform: uppercase;
        }
        .maturity-high { background: #dcfce7; color: #166534; }
        .maturity-medium { background: #fef3c7; color: #92400e; }
        .maturity-low { background: #fee2e2; color: #991b1b; }
        
        .tech-card-description {
            color: var(--slate);
            margin-bottom: 12px;
            font-size: 10pt;
        }
        
        .tech-card-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 12px;
        }
        .tech-card-section h5 {
            font-size: 9pt;
            font-weight: 700;
            color: var(--dark-navy);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .tech-card-section ul {
            margin: 0;
            padding-left: 16px;
            font-size: 9pt;
        }
        .tech-card-section li {
            margin-bottom: 4px;
        }
        
        .cta-box {
            background: linear-gradient(135deg, var(--dartmouth-green) 0%, var(--teal) 100%);
            color: var(--white);
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
        }
        .cta-box h4 {
            color: var(--white);
            font-size: 14pt;
            margin-bottom: 8px;
        }
        .cta-box p {
            opacity: 0.9;
            margin-bottom: 16px;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            background: var(--white);
            color: var(--dartmouth-green);
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 700;
            text-decoration: none;
            font-size: 10pt;
        }
    </style>

<!-- COVER PAGE -->
<div class="brand">BREAK IT DOWN</div>
<div class="tagline">Complex Systems, Simply Explained</div>

<h1>AI & Business Systems</h1>
<p class="subtitle">A Primer for Business Leaders</p>

<div class="divider"></div>

<p>Every major technology transformation has reshaped which businesses thrive and which fall behind. From mainframes to personal computers, from on-premise servers to cloud computing, the organizations that succeeded through these transitions were not necessarily the earliest adopters or the largest spenders. They were the ones who developed a clear understanding of what was actually changing and built the organizational capabilities to adapt.</p>

<p>This primer provides a systematic examination of artificial intelligence as the latest chapter in this ongoing transformation. It is designed to give business leaders, regardless of technical background, a clear framework for understanding: What are the different types of AI and what can each actually do? How does AI relate to the broader landscape of business technology? And what separates successful AI initiatives from the 95% that fail to deliver measurable returns?<span class="citation">[1]</span></p>

<div class="stats-row">
    <div class="stat-box">
        <div class="stat-number">$4.4T</div>
        <div class="stat-label">Potential annual global value<br>from generative AI<span class="citation">[2]</span></div>
    </div>
    <div class="stat-box">
        <div class="stat-number red">95%</div>
        <div class="stat-label">Enterprise AI pilots that fail<br>to reach production<span class="citation">[1]</span></div>
    </div>
    <div class="stat-box">
        <div class="stat-number blue">14%</div>
        <div class="stat-label">Market cap premium for<br>digitally mature organizations<span class="citation">[3]</span></div>
    </div>
</div>

<div class="author-info">
    <div class="author-name">Hailey</div>
    <div class="author-credentials">Dartmouth Engineering · MEng Operations Research · Morgan Stanley</div>
    <div class="author-credentials" style="margin-top: 8px;">January 2025</div>
</div>

<div class="page-break"></div>

<!-- EXECUTIVE SUMMARY -->
<div class="section-header">
    <div class="section-label">Executive Summary</div>
    <h2>Key Findings</h2>
</div>

<p>This primer examines artificial intelligence as a component of broader business technology infrastructure. Rather than focusing on vendor capabilities or technical specifications, it analyzes AI within the context of multi-decade digital transformation patterns and identifies the organizational factors that determine success or failure.</p>

<div class="insight-box">
    <p><span class="insight-label">Finding 1: AI builds on prior technology investments.</span> Artificial intelligence is not a standalone capability. It depends on data infrastructure, system integration, and process discipline that organizations have been building (or neglecting) for decades. A business's track record with prior technology transformations is the strongest predictor of AI outcomes.<span class="citation">[3][4]</span></p>
</div>

<div class="insight-box blue">
    <p><span class="insight-label">Finding 2: Most AI initiatives fail due to organizational factors, not technology limitations.</span> MIT research examining 300+ enterprise AI deployments found that 95% fail to progress from pilot to production with measurable return on investment. The primary barriers are data quality issues, integration complexity, and change management failures, not model performance.<span class="citation">[1]</span></p>
</div>

<div class="insight-box teal">
    <p><span class="insight-label">Finding 3: Different technologies serve different purposes.</span> The term "AI" encompasses technologies ranging from rule-based automation to generative language models to autonomous agents. Each has distinct strengths, limitations, and organizational requirements. Successful implementations match the right technology to the right problem.<span class="citation">[5]</span></p>
</div>

<div class="insight-box">
    <p><span class="insight-label">Finding 4: Value accrues at specific layers of the technology stack.</span> In AI infrastructure, value concentrates at the compute layer (dominated by a few hardware manufacturers) and at the application layer (where organizations apply AI to their unique data and workflows). Businesses competing at the data and application layers have sustainable advantages.<span class="citation">[2][6]</span></p>
</div>

<h3>Contents</h3>

<div class="toc-item"><span class="toc-section">Section 1: The Digital Transformation Continuum</span></div>
<div class="toc-item"><span class="toc-section">Section 2: Defining Terms: Types of AI and Related Technologies</span></div>
<div class="toc-item"><span class="toc-section">Section 3: The AI Technology Stack</span></div>
<div class="toc-item"><span class="toc-section">Section 4: The Technology Toolbox: Capabilities and Applications</span></div>
<div class="toc-item"><span class="toc-section">Section 5: Why AI Initiatives Fail</span></div>
<div class="toc-item"><span class="toc-section">Section 6: Evaluating AI Opportunities</span></div>
<div class="toc-item"><span class="toc-section">References</span></div>

<div class="page-break"></div>

<!-- SECTION 1: DIGITAL TRANSFORMATION CONTINUUM -->
<div class="section-header">
    <div class="section-label">Section 1</div>
    <h2>The Digital Transformation Continuum</h2>
</div>

<p>Artificial intelligence represents the latest phase in a technology transformation that has been reshaping business operations for over four decades. Understanding this historical context is essential for making sound strategic decisions about AI investment.</p>

<h3>Why History Matters</h3>

<p>Consider the introduction of the internet in the 1990s. When the World Wide Web emerged as a commercial technology, its implications were unclear. Some organizations, such as Amazon (founded 1994) and Google (founded 1998), built entirely new business models around internet capabilities. Many established companies dismissed the technology as irrelevant to their operations, then scrambled to adapt when competitive dynamics shifted. Others invested heavily but failed to develop the organizational capabilities needed to execute effectively.<span class="citation">[7]</span></p>

<p>The pattern has repeated with each subsequent technology wave. Research from Deloitte and MIT Sloan Management Review, tracking organizational technology adoption over two decades, found that the same organizational traits predict success across different technology eras: data governance discipline, cross-functional collaboration, willingness to experiment, and integration architecture maturity.<span class="citation">[4][8]</span></p>

<h3>Four Decades of Enterprise Technology Transformation</h3>

<div class="diagram">
    <div class="diagram-title">Technology Transformation Timeline</div>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-dot" style="background: var(--dartmouth-green);"></div>
            <div class="timeline-year">1990s</div>
            <div class="timeline-label">ERP Systems</div>
            <div class="timeline-desc">Process standardization</div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot" style="background: var(--teal);"></div>
            <div class="timeline-year">2000s</div>
            <div class="timeline-label">Cloud & SaaS</div>
            <div class="timeline-desc">Infrastructure flexibility</div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot" style="background: var(--blue);"></div>
            <div class="timeline-year">2010s</div>
            <div class="timeline-label">Analytics & BI</div>
            <div class="timeline-desc">Data-driven decisions</div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot" style="background: var(--navy);"></div>
            <div class="timeline-year">2020s</div>
            <div class="timeline-label">AI & Automation</div>
            <div class="timeline-desc">Intelligent operations</div>
        </div>
    </div>
</div>
<p class="table-caption">Figure 1: Each technology era built capabilities that enabled the next wave of adoption</p>

<p>Each of these technology eras introduced new capabilities while building on the foundations established by previous waves. Organizations that successfully navigated earlier transformations developed the data infrastructure, integration architecture, and change management capabilities that later technologies required.</p>

<div class="definition-box">
    <div class="definition-term">Enterprise Resource Planning (ERP) Systems · 1990s to 2000s</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> ERP systems are software platforms that integrate a business's core operations into a unified system. Before ERP, most businesses ran separate software for each function (finance, human resources, supply chain, manufacturing), requiring manual data transfer between systems. Companies like SAP, Oracle, and PeopleSoft built platforms that consolidated these functions, creating a single source of truth for operational data.<span class="citation">[9]</span></p>
        <p><strong>Why it mattered:</strong> Organizations that successfully implemented ERP developed standardized processes and data discipline. They learned how to document workflows, clean data, and manage large-scale technology change. These capabilities became prerequisites for later technology adoption.</p>
        <p><strong>Example:</strong> Before ERP, a manufacturing company might track inventory in one system, sales orders in another, and finances in a third. When a customer placed an order, employees manually checked inventory, entered the order, and updated financial records separately. ERP connected these functions so a single order entry could automatically check inventory, schedule production, and update financial projections.</p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">Cloud Computing & Software-as-a-Service (SaaS) · 2000s to 2010s</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> Cloud computing shifted technology infrastructure from physical servers owned and operated by individual businesses to shared resources accessed over the internet. Instead of purchasing, installing, and maintaining their own hardware, organizations could rent computing capacity from providers like Amazon Web Services (AWS, launched 2006), Microsoft Azure, and Google Cloud Platform.<span class="citation">[10]</span></p>
        <p><strong>Why it mattered:</strong> Cloud computing transformed technology from a capital expenditure (buying servers) to an operational expenditure (paying for usage). This gave organizations flexibility to scale up or down based on demand and reduced the technical expertise required to operate infrastructure. It also enabled the rise of SaaS applications, where software is delivered over the internet rather than installed locally.</p>
        <p><strong>Example:</strong> A retail company previously needed to buy enough server capacity to handle peak traffic (such as Black Friday), leaving expensive hardware idle most of the year. With cloud computing, the same company can temporarily expand capacity during peak periods and scale back to normal levels afterward, paying only for what is actually used.</p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">Analytics & Business Intelligence (BI) · 2010s to 2020s</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> Analytics and BI technologies enabled organizations to systematically analyze operational data to identify patterns, trends, and insights. This included data warehouses (centralized repositories optimized for analysis), visualization tools (such as Tableau and Power BI), and statistical analysis capabilities.<span class="citation">[11]</span></p>
        <p><strong>Why it mattered:</strong> Organizations that invested in analytics developed data infrastructure and analytical talent. They learned how to collect, clean, and structure data for analysis. They also surfaced data quality problems that had been hidden when data remained in siloed systems. The discipline required for effective analytics laid the groundwork for AI applications.</p>
        <p><strong>Example:</strong> A bank analyzing transaction patterns to identify potentially fraudulent activity, or a retailer examining purchase history to optimize inventory levels and personalize marketing campaigns. These applications required clean, accessible data and the organizational capability to act on analytical insights.</p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">Artificial Intelligence & Automation · 2020s to Present</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> The current technology era is characterized by AI systems that can learn from data, generate content, and automate complex tasks. This includes machine learning for prediction and classification, large language models for text generation and analysis, and various automation technologies that can handle increasingly sophisticated workflows.<span class="citation">[2]</span></p>
        <p><strong>Why it mattered:</strong> AI extends previous capabilities by enabling systems to handle tasks that previously required human judgment: interpreting unstructured text, generating written content, recognizing patterns in complex data, and adapting to new situations. However, effective AI deployment depends heavily on the data infrastructure, integration capabilities, and change management practices developed in earlier eras.</p>
        <p><strong>Example:</strong> A customer service operation using large language models to draft responses to common inquiries, with human agents reviewing and sending the final messages. Or a financial services firm using machine learning to identify unusual transaction patterns that might indicate fraud, flagging them for human review.</p>
    </div>
</div>

<h3>The Compounding Effect</h3>

<p>Each technology era built capabilities that enabled the next. Organizations that successfully implemented ERP systems developed process discipline and data standardization. That discipline made cloud adoption more feasible because migrating to cloud infrastructure is far easier when processes are documented and data is well organized. Cloud flexibility supported analytics investments by reducing infrastructure barriers. Analytics initiatives created data infrastructure and quality practices that AI systems now require.<span class="citation">[3][4]</span></p>

<p>This pattern creates compounding advantages for organizations that successfully navigated earlier transformations and compounding challenges for those that did not. A business that struggled with ERP implementation, never fully adopted cloud infrastructure, or failed to establish data governance is not just "behind" on AI. It lacks the foundational capabilities that make AI adoption feasible.</p>

<div class="insight-box">
    <p><span class="insight-label">Research Finding:</span> A 2023 Deloitte analysis examined financial disclosures from over 4,600 companies to understand the relationship between digital transformation investments and business outcomes. The research found that organizations effectively aligning technology investments with organizational change initiatives experience a 14% market capitalization differential compared to those that invest in technology but fail to manage the accompanying transformation. For Fortune 500 companies, this gap represents approximately $2.75 trillion in aggregate value. The study concluded that the value differential reflects accumulated organizational capabilities, not just technology spending.<span class="citation">[3]</span></p>
</div>

<h3>Implications for AI Strategy</h3>

<p>The strategic implication is significant: AI is not a fresh start. A business's historical track record with technology transformation is the strongest predictor of AI outcomes. The same organizational capabilities that determined success with ERP, cloud, and analytics will determine success with AI.</p>

<table>
    <tr>
        <th>If a business has...</th>
        <th>Then with AI, expect...</th>
    </tr>
    <tr>
        <td>Strong data governance and quality practices</td>
        <td>Faster deployment timelines, better model performance</td>
    </tr>
    <tr>
        <td>Mature integration architecture (APIs, middleware)</td>
        <td>Smoother connections between AI tools and existing systems</td>
    </tr>
    <tr>
        <td>Track record of successful change management</td>
        <td>Higher adoption rates, faster time to value</td>
    </tr>
    <tr>
        <td>Executive alignment on technology priorities</td>
        <td>Clearer investment decisions, sustained commitment</td>
    </tr>
    <tr>
        <td>History of stalled or failed technology initiatives</td>
        <td>Similar patterns, likely with the same root causes</td>
    </tr>
</table>
<p class="table-caption">Figure 2: Prior technology experience as a predictor of AI outcomes</p>

<div class="page-break"></div>

<!-- SECTION 2: DEFINING TERMS -->
<div class="section-header">
    <div class="section-label">Section 2</div>
    <h2>Defining Terms: Types of AI and Related Technologies</h2>
</div>

<p>The term "artificial intelligence" is used to describe technologies ranging from simple rule-following programs to systems that can generate human-like text and images. This imprecision creates confusion in business discussions. When a vendor promises "AI capabilities" or an executive proposes an "AI strategy," the specific technology being referenced is often unclear.</p>

<p>This section provides precise definitions for the major categories of AI and related technologies. Understanding these distinctions is essential for matching the right technology to the right business problem.</p>

<h3>The AI Umbrella</h3>

<div class="definition-box">
    <div class="definition-term">Artificial Intelligence (AI)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> An umbrella term for computer systems designed to perform tasks that typically require human intelligence. This includes learning from experience, recognizing patterns, making decisions, and understanding language. The term encompasses a wide range of technologies with very different capabilities.<span class="citation">[12]</span></p>
        <p><strong>Important note:</strong> "AI" alone is too broad to be useful in business planning. The relevant question is always: <em>which type</em> of AI, applied to <em>which problem</em>?</p>
    </div>
</div>

<h3>Types of Machine Learning</h3>

<div class="definition-box">
    <div class="definition-term">Machine Learning (ML)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> A subset of AI where systems learn patterns from data rather than following explicitly programmed rules. Traditional software operates on logic defined by programmers: "if X, then Y." Machine learning inverts this. The system is given examples (data) and identifies patterns on its own.<span class="citation">[13]</span></p>
        <p><strong>Analogy:</strong> Traditional programming is like giving someone a recipe to follow. Machine learning is like showing someone thousands of finished dishes and letting them figure out how to cook.</p>
        <p><strong>Three main approaches:</strong></p>
        <ul>
            <li><strong>Supervised learning:</strong> The system learns from labeled examples. Given inputs paired with correct outputs, it learns to predict outputs for new inputs. Examples include spam detection and credit scoring.</li>
            <li><strong>Unsupervised learning:</strong> The system finds patterns in unlabeled data without explicit guidance. Examples include customer segmentation and anomaly detection.</li>
            <li><strong>Reinforcement learning:</strong> The system learns through trial and error, receiving rewards or penalties for actions taken. Examples include game-playing AI and robotics.</li>
        </ul>
    </div>
</div>

<h3>Generative AI Technologies</h3>

<div class="definition-box">
    <div class="definition-term">Large Language Model (LLM)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> A neural network trained on vast quantities of text data, including books, websites, articles, code, and conversations. LLMs learn statistical patterns in language: which words tend to follow other words, how sentences and paragraphs are structured, and reasoning patterns expressed in text. Examples include GPT-4 (OpenAI), Claude (Anthropic), Gemini (Google), and LLaMA (Meta).<span class="citation">[16][17]</span></p>
        <p><strong>Key insight:</strong> LLMs generate text by predicting what word should come next, based on patterns learned from training data. They do not "understand" in the human sense. They identify and reproduce statistical patterns.</p>
        <p><strong>Scale context:</strong> A large language model like GPT-4 has hundreds of billions of parameters (the numerical values adjusted during training). The process of determining optimal parameters requires massive computing resources and carefully prepared datasets.</p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">Generative AI (GenAI)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> AI systems that can create new content, including text, images, audio, video, and code, rather than simply analyzing or classifying existing content. Large language models are one type of generative AI. Image generation models (DALL-E, Midjourney, Stable Diffusion) are another.<span class="citation">[2]</span></p>
        <p><strong>Distinction from traditional AI:</strong> Traditional machine learning typically classifies or predicts. (Is this email spam? What will this house sell for?) Generative AI creates new content. (Write an email. Generate an image.)</p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">AI Agent (Agentic AI)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> An AI system that can take actions autonomously to achieve goals, rather than simply responding to individual queries. Agents can use tools (search the web, execute code, access databases), maintain context across multiple steps, and make decisions based on intermediate results.<span class="citation">[1][19]</span></p>
        <p><strong>Current status:</strong> AI agents represent the frontier of current AI capability. They are impressive in demonstrations but limited in production deployments. The MIT NANDA research found that autonomous agent deployments have the highest failure rates among enterprise AI initiatives.<span class="citation">[1]</span></p>
    </div>
</div>

<h3>Related Technologies (Not AI)</h3>

<p>Several technologies are frequently discussed alongside AI but operate on fundamentally different principles:</p>

<div class="definition-box">
    <div class="definition-term">Robotic Process Automation (RPA)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> Software that mimics human interactions with computer systems by clicking buttons, typing text, and copying data between applications. RPA follows predefined rules; it does not learn or adapt. Think of it as a very fast, tireless employee who follows exact instructions but cannot handle anything unexpected.<span class="citation">[20]</span></p>
        <p><strong>Distinction from AI:</strong> RPA is rule-based automation, not artificial intelligence. It cannot handle variation or make judgments. However, "intelligent automation" increasingly combines RPA with AI components.</p>
        <p><strong>Market context:</strong> The global RPA market was valued at approximately $18 billion in 2024, growing 30 to 40 percent annually.<span class="citation">[21]</span></p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">Intelligent Document Processing (IDP)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> Systems that extract and classify information from unstructured documents using AI. IDP combines multiple technologies:<span class="citation">[22]</span></p>
        <ul>
            <li><strong>OCR (Optical Character Recognition):</strong> Converts images of text into machine-readable text</li>
            <li><strong>NLP (Natural Language Processing):</strong> Interprets the meaning of text</li>
            <li><strong>Machine learning:</strong> Improves accuracy through feedback over time</li>
        </ul>
        <p><strong>Use cases:</strong> Processing invoices from different vendors, extracting data from contracts, handling customer correspondence in various formats.</p>
    </div>
</div>

<div class="definition-box">
    <div class="definition-term">Application Programming Interface (API)</div>
    <div class="definition-text">
        <p><strong>What it is:</strong> A standardized way for software systems to communicate with each other. When one system needs data or functionality from another, it makes an API call, which is essentially a structured request that the other system knows how to interpret and respond to.<span class="citation">[23]</span></p>
        <p><strong>Relevance to AI:</strong> Most businesses access AI capabilities through APIs. Rather than running AI models on their own infrastructure, they send requests to cloud-based AI services (OpenAI, Anthropic, Google) and receive responses. API integration quality often determines whether AI deployments succeed.</p>
    </div>
</div>

<div class="page-break"></div>

<!-- SECTION 3: THE AI STACK -->
<div class="section-header">
    <div class="section-label">Section 3</div>
    <h2>The AI Technology Stack</h2>
</div>

<p>Every AI capability relies on four interconnected technology layers. Understanding this architecture reveals where value is created in the AI ecosystem and where businesses should focus their efforts.</p>

<div class="diagram">
    <div class="diagram-title">AI Infrastructure Stack</div>
    <div style="display: flex; align-items: stretch;">
        <div style="flex: 0 0 60px; display: flex; flex-direction: column; justify-content: flex-start; padding-right: 12px; padding-top: 0;">
            <div style="height: 100px; border: 2px solid var(--dartmouth-green); border-left: none; border-radius: 0 8px 8px 0; position: relative;">
                <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%) rotate(0deg); font-size: 9pt; font-weight: 700; color: var(--dartmouth-green); writing-mode: vertical-rl; text-orientation: mixed;">BUSINESS FOCUS</div>
            </div>
        </div>
        <div class="stack" style="flex: 1;">
            <div class="stack-layer applications">
                <div>
                    <div class="stack-name">Applications</div>
                    <div class="stack-desc">Where businesses create value from AI</div>
                </div>
                <div class="stack-examples">ChatGPT, Copilot, custom tools</div>
            </div>
            <div class="stack-layer data">
                <div>
                    <div class="stack-name">Data</div>
                    <div class="stack-desc">The fuel for AI and a business's competitive advantage</div>
                </div>
                <div class="stack-examples">Customer data, operations, documents</div>
            </div>
            <div class="stack-layer models">
                <div>
                    <div class="stack-name">Models</div>
                    <div class="stack-desc">Algorithms that process information</div>
                </div>
                <div class="stack-examples">GPT-4, Claude, Gemini, LLaMA</div>
            </div>
            <div class="stack-layer compute">
                <div>
                    <div class="stack-name">Compute</div>
                    <div class="stack-desc">Physical hardware that powers AI</div>
                </div>
                <div class="stack-examples">GPUs, data centers, cloud infrastructure</div>
            </div>
        </div>
    </div>
</div>
<p class="table-caption">Figure 3: The four-layer AI infrastructure stack. Most businesses should focus on the Applications and Data layers.</p>

<h3>Understanding Each Layer</h3>

<h4>Layer 1: Compute</h4>
<p>The physical hardware that powers AI systems. AI workloads require specialized processors, primarily Graphics Processing Units (GPUs), that can perform the parallel mathematical operations neural networks require. This layer also includes data centers, cooling systems, and power infrastructure.<span class="citation">[24]</span></p>

<h4>Layer 2: Models</h4>
<p>The algorithms and neural network architectures that process information. This includes foundation models (GPT-4, Claude, Gemini), open-source alternatives (LLaMA, Mistral), and specialized models fine-tuned for specific tasks. Training a state-of-the-art large language model requires investments measured in hundreds of millions to billions of dollars.<span class="citation">[25]</span></p>

<h4>Layer 3: Data</h4>
<p>The fuel for AI systems. Training data shapes what models can do in general. Enterprise data determines what AI can do for a specific business. Foundation models are trained on public data available to everyone; a business's proprietary data is what enables differentiation.<span class="citation">[2]</span></p>

<h4>Layer 4: Applications</h4>
<p>The interfaces and systems through which users interact with AI capabilities. This is where most businesses will compete: not by building their own models, but by applying existing models to their unique data and workflows in ways that create value.</p>

<h3>Where Value Concentrates</h3>

<table>
    <tr>
        <th>Layer</th>
        <th>Market Concentration</th>
        <th>Strategic Recommendation</th>
    </tr>
    <tr>
        <td><strong>Compute</strong></td>
        <td>Highly concentrated (NVIDIA holds approximately 80% of the AI chip market)<span class="citation">[26]</span></td>
        <td>Access through cloud providers; do not attempt to compete</td>
    </tr>
    <tr>
        <td><strong>Models</strong></td>
        <td>Consolidating among a few frontier labs with billions in capital</td>
        <td>Use existing models via API or open source; fine-tune for specific needs</td>
    </tr>
    <tr>
        <td><strong>Data</strong></td>
        <td>Distributed (each organization's data is unique)</td>
        <td>Invest in quality and accessibility; this is a sustainable advantage</td>
    </tr>
    <tr>
        <td><strong>Applications</strong></td>
        <td>Fragmented (thousands of players)</td>
        <td>Focus here; match AI capabilities to specific workflows</td>
    </tr>
</table>
<p class="table-caption">Figure 4: Value distribution and strategic implications across the AI stack</p>

<div class="insight-box">
    <p><span class="insight-label">Strategic Takeaway:</span> For most organizations, the right strategy is clear: do not try to compete at the compute or model layer (which requires billions in capital). Instead, focus on data (a unique asset) and applications (how to create value). Access compute and models through cloud providers and APIs.</p>
</div>

<div class="page-break"></div>

<!-- SECTION 4: THE TECHNOLOGY TOOLBOX -->
<div class="section-header">
    <div class="section-label">Section 4</div>
    <h2>The Technology Toolbox: Capabilities and Applications</h2>
</div>

<p>Business leaders often think in umbrella terms like "IT," "tech," or "AI" without understanding the distinct capabilities of different technologies. This section provides a comprehensive view of the tools available, from simple automation to frontier AI, helping leaders understand which technology fits which business problem.</p>

<p>The technologies below are organized from simplest to most complex. A key principle: organizations should generally master simpler technologies before attempting more complex ones. The MIT NANDA research found that businesses with mature automation practices, even simple ones, had significantly higher success rates with AI initiatives.<span class="citation">[1]</span></p>

<h3>The Automation and AI Spectrum</h3>

<div class="diagram">
    <div class="diagram-title">From Simple Automation to Autonomous AI</div>
    <p style="text-align: center; font-size: 9pt; color: var(--gray); margin-bottom: 12px;">
        Lower complexity & risk ←――――――――――――――――――――――――→ Higher complexity & risk
    </p>
    <div class="spectrum">
        <div class="spectrum-item level1"><div class="spectrum-num">1</div><div class="spectrum-name">Scripts</div></div>
        <div class="spectrum-item level2"><div class="spectrum-num">2</div><div class="spectrum-name">RPA</div></div>
        <div class="spectrum-item level3"><div class="spectrum-num">3</div><div class="spectrum-name">Traditional ML</div></div>
        <div class="spectrum-item level4"><div class="spectrum-num">4</div><div class="spectrum-name">Generative AI</div></div>
        <div class="spectrum-item level5"><div class="spectrum-num">5</div><div class="spectrum-name">AI Agents</div></div>
    </div>
</div>
<p class="table-caption">Figure 5: The spectrum of automation and AI technologies</p>

<!-- TECHNOLOGY CARD 1: Scripts and Macros -->
<div class="tech-card">
    <div class="tech-card-header">
        <div class="tech-card-title">1. Scripts and Macros</div>
        <span class="tech-card-maturity maturity-high">Mature Technology</span>
    </div>
    <p class="tech-card-description">Simple recorded or coded sequences that automate repetitive tasks. When someone records an Excel macro or writes a small program to rename files in a folder, they are creating a script. The computer follows exact instructions in exact order.</p>

    <div class="tech-card-grid">
        <div class="tech-card-section">
            <h5>Best suited for</h5>
            <ul>
                <li>Tasks that are identical every time</li>
                <li>Single-application workflows</li>
                <li>File management and data formatting</li>
                <li>Scheduled report generation</li>
            </ul>
        </div>
        <div class="tech-card-section">
            <h5>Limitations</h5>
            <ul>
                <li>Cannot handle any variation</li>
                <li>Breaks if inputs change format</li>
                <li>No decision-making capability</li>
                <li>Requires technical skill to create</li>
            </ul>
        </div>
    </div>
    
    <div class="example-box" style="margin-top: 12px;">
        <div class="example-label">Example Application</div>
        <p style="margin: 0; font-size: 9pt;">An analyst creates an Excel macro that reformats downloaded sales data into a standard template every Monday morning. The macro works perfectly as long as the source data format never changes but fails if the source system adds a new column.</p>
    </div>
</div>

<!-- TECHNOLOGY CARD 2: RPA -->
<div class="tech-card rpa">
    <div class="tech-card-header">
        <div class="tech-card-title">2. Robotic Process Automation (RPA)</div>
        <span class="tech-card-maturity maturity-high">Mature Technology</span>
    </div>
    <p class="tech-card-description">Software "bots" that mimic human interactions with computer applications by clicking buttons, typing text, and copying data between systems. RPA can work across multiple applications and includes basic conditional logic (if/then rules). Major vendors include UiPath, Automation Anywhere, and Blue Prism.<span class="citation">[20]</span></p>

    <div class="tech-card-grid">
        <div class="tech-card-section">
            <h5>Best suited for</h5>
            <ul>
                <li>Rule-based processes spanning multiple systems</li>
                <li>High-volume, repetitive transactions</li>
                <li>Structured data with predictable formats</li>
                <li>Processes with well-defined decision trees</li>
            </ul>
        </div>
        <div class="tech-card-section">
            <h5>Limitations</h5>
            <ul>
                <li>Brittle to user interface changes</li>
                <li>Cannot handle unstructured data</li>
                <li>Significant maintenance burden (30 to 40% of effort)</li>
                <li>No ability to handle novel situations</li>
            </ul>
        </div>
    </div>
    
    <div class="example-box" style="margin-top: 12px;">
        <div class="example-label">Example Application</div>
        <p style="margin: 0; font-size: 9pt;">An insurance company deploys RPA to process standard claims. The bot logs into the claims system, extracts claim details, checks them against policy databases, verifies coverage limits, and routes approved claims for payment. A 2024 survey found 52% of financial services organizations saved at least $100,000 annually through RPA deployments.<span class="citation">[21]</span></p>
    </div>
</div>

<!-- TECHNOLOGY CARD 3: Traditional ML -->
<div class="tech-card ml">
    <div class="tech-card-header">
        <div class="tech-card-title">3. Traditional Machine Learning</div>
        <span class="tech-card-maturity maturity-high">Mature Technology</span>
    </div>
    <p class="tech-card-description">Systems that learn patterns from data to classify, predict, or cluster information. Unlike generative AI, traditional ML analyzes existing content rather than creating new content. These systems are generally more reliable, interpretable, and efficient than generative AI for classification and prediction tasks.<span class="citation">[13]</span></p>

    <div class="tech-card-grid">
        <div class="tech-card-section">
            <h5>Best suited for</h5>
            <ul>
                <li>Classification (spam detection, fraud identification)</li>
                <li>Prediction (demand forecasting, pricing)</li>
                <li>Recommendation (product suggestions)</li>
                <li>Anomaly detection (unusual transactions)</li>
                <li>Customer segmentation</li>
            </ul>
        </div>
        <div class="tech-card-section">
            <h5>Limitations</h5>
            <ul>
                <li>Requires substantial labeled training data</li>
                <li>Performance degrades outside training distribution</li>
                <li>Cannot generate new content</li>
                <li>May perpetuate biases in training data</li>
            </ul>
        </div>
    </div>
    
    <div class="example-box" style="margin-top: 12px;">
        <div class="example-label">Example Applications</div>
        <p style="margin: 0; font-size: 9pt;"><strong>Fraud detection:</strong> A bank trains a model on historical transaction data labeled as fraudulent or legitimate. The model learns patterns associated with fraud and flags suspicious new transactions for review.</p>
        <p style="margin: 8px 0 0 0; font-size: 9pt;"><strong>Demand forecasting:</strong> A retailer uses historical sales data, seasonality patterns, and external factors to predict future demand, enabling better inventory management.</p>
    </div>
</div>

<!-- TECHNOLOGY CARD 4: IDP -->
<div class="tech-card idp">
    <div class="tech-card-header">
        <div class="tech-card-title">4. Intelligent Document Processing (IDP)</div>
        <span class="tech-card-maturity maturity-medium">Established Technology</span>
    </div>
    <p class="tech-card-description">Systems that extract and classify information from unstructured documents using AI. IDP combines optical character recognition (OCR), natural language processing (NLP), and machine learning to read documents, identify relevant fields, extract data, and route for processing. Major vendors include ABBYY, Hyperscience, Kofax, and cloud offerings from AWS, Google, and Microsoft.<span class="citation">[22]</span></p>

    <div class="tech-card-grid">
        <div class="tech-card-section">
            <h5>Best suited for</h5>
            <ul>
                <li>High-volume document processing</li>
                <li>Variable document formats (invoices, contracts)</li>
                <li>Extracting structured data from unstructured sources</li>
                <li>Reducing manual data entry</li>
            </ul>
        </div>
        <div class="tech-card-section">
            <h5>Limitations</h5>
            <ul>
                <li>Accuracy depends on document quality</li>
                <li>Unusual formats require human review</li>
                <li>Requires training period and labeled examples</li>
                <li>Handwriting recognition still challenging</li>
            </ul>
        </div>
    </div>
    
    <div class="example-box" style="margin-top: 12px;">
        <div class="example-label">Example Application</div>
        <p style="margin: 0; font-size: 9pt;">An accounts payable department receives invoices in dozens of formats from hundreds of vendors, some emailed as PDFs, some mailed as paper, some extracted from procurement systems. IDP reads each invoice, identifies vendor name, amount, line items, and due date, then routes to appropriate approval workflows.</p>
    </div>
</div>

<!-- TECHNOLOGY CARD 5: Generative AI -->
<div class="tech-card llm">
    <div class="tech-card-header">
        <div class="tech-card-title">5. Generative AI and Large Language Models</div>
        <span class="tech-card-maturity maturity-medium">Rapidly Evolving</span>
    </div>
    <p class="tech-card-description">AI systems that can create new content, including text, images, audio, video, and code. Large language models (GPT-4, Claude, Gemini) generate text by predicting what should come next based on patterns learned from training data. This enables capabilities from drafting emails to writing code to analyzing documents.<span class="citation">[16][17]</span></p>

    <div class="tech-card-grid">
        <div class="tech-card-section">
            <h5>What LLMs can reliably do</h5>
            <ul>
                <li>Generate coherent, contextual text</li>
                <li>Summarize documents and extract key points</li>
                <li>Translate between languages</li>
                <li>Follow natural language instructions</li>
                <li>Write and explain code</li>
                <li>Draft emails, reports, and business writing</li>
            </ul>
        </div>
        <div class="tech-card-section">
            <h5>What LLMs cannot reliably do</h5>
            <ul>
                <li>Guarantee factual accuracy ("hallucination")</li>
                <li>Access real-time information (without tools)</li>
                <li>Perform reliable mathematical calculations</li>
                <li>Remember previous conversations (without context)</li>
                <li>Reason far beyond training data</li>
                <li>Verify the truth of their own statements</li>
            </ul>
        </div>
    </div>
    
    <div class="insight-box teal" style="margin-top: 12px;">
        <p><span class="insight-label">Critical Limitation: Hallucination.</span> LLMs can generate text that is fluent, confident, and completely false. This occurs because they are trained to produce plausible-sounding text, not to verify accuracy. Any LLM deployment for business purposes must include mechanisms to catch errors: human review, fact-checking against authoritative sources, or restriction to use cases where errors are tolerable.<span class="citation">[27]</span></p>
    </div>
    
    <div class="example-box" style="margin-top: 12px;">
        <div class="example-label">Example Applications</div>
        <p style="margin: 0; font-size: 9pt;"><strong>Draft generation:</strong> A legal team uses an LLM to create first drafts of standard contracts, with attorneys reviewing and refining the output.</p>
        <p style="margin: 8px 0 0 0; font-size: 9pt;"><strong>Code assistance:</strong> Developers use GitHub Copilot to suggest code implementations. Research found developers using Copilot completed tasks 55% faster on average, though benefits varied by task type.<span class="citation">[28]</span></p>
        <p style="margin: 8px 0 0 0; font-size: 9pt;"><strong>Customer service:</strong> A support team uses LLMs to draft responses to common inquiries, with agents reviewing before sending.</p>
    </div>
</div>

<!-- TECHNOLOGY CARD 6: AI Agents -->
<div class="tech-card agents">
    <div class="tech-card-header">
        <div class="tech-card-title">6. AI Agents (Agentic AI)</div>
        <span class="tech-card-maturity maturity-low">Frontier Technology</span>
    </div>
    <p class="tech-card-description">AI systems that can plan and execute multi-step tasks with minimal human intervention. Agents can use tools (search the web, execute code, access databases), maintain context across steps, and adapt based on results. This represents the frontier of current AI capability.<span class="citation">[19]</span></p>

    <div class="tech-card-grid">
        <div class="tech-card-section">
            <h5>Potential applications</h5>
            <ul>
                <li>Complex research and investigation</li>
                <li>Multi-step workflow automation</li>
                <li>Autonomous coding for defined problems</li>
                <li>Complex customer service scenarios</li>
            </ul>
        </div>
        <div class="tech-card-section">
            <h5>Significant limitations</h5>
            <ul>
                <li>Very high failure rates (95%+ in pilots)<span class="citation">[1]</span></li>
                <li>Difficult to predict behavior</li>
                <li>Challenging to audit decisions</li>
                <li>Security implications of autonomous action</li>
            </ul>
        </div>
    </div>
    
    <div class="red-flag" style="margin-top: 12px;">
        <p><span class="red-flag-title">Caution:</span> Autonomous agents are the most discussed and least proven category of AI. Impressive demonstrations often do not translate to production reliability. Most organizations lack the data infrastructure, integration architecture, and governance frameworks required for successful agent deployment. The MIT NANDA research found that agent deployments have the highest failure rates among enterprise AI initiatives.<span class="citation">[1]</span></p>
    </div>
</div>

<h3>Selecting the Right Technology</h3>

<p>Choosing the appropriate technology depends on the specific business problem. The table below provides guidance for common scenarios:</p>

<table>
    <tr>
        <th>If the task involves...</th>
        <th>Consider...</th>
        <th>Not...</th>
    </tr>
    <tr>
        <td>Identical, repetitive steps in one system</td>
        <td>Scripts and macros</td>
        <td>Any AI (unnecessary complexity)</td>
    </tr>
    <tr>
        <td>Rule-based workflows across multiple systems</td>
        <td>RPA</td>
        <td>LLMs (cannot follow precise rules reliably)</td>
    </tr>
    <tr>
        <td>Classifying items into categories</td>
        <td>Traditional ML (more reliable)</td>
        <td>Generative AI (overkill, less consistent)</td>
    </tr>
    <tr>
        <td>Predicting numerical outcomes</td>
        <td>Traditional ML regression</td>
        <td>LLMs (not designed for numerical prediction)</td>
    </tr>
    <tr>
        <td>Extracting data from variable documents</td>
        <td>IDP</td>
        <td>Simple RPA (cannot handle variation)</td>
    </tr>
    <tr>
        <td>Generating or transforming text</td>
        <td>Large language models</td>
        <td>Traditional ML (cannot generate text)</td>
    </tr>
    <tr>
        <td>Complex, multi-step autonomous tasks</td>
        <td>AI agents (with caution, pilot only)</td>
        <td>Simple chatbots (cannot plan or use tools)</td>
    </tr>
</table>
<p class="table-caption">Figure 6: Technology selection framework</p>

<div class="insight-box">
    <p><span class="insight-label">Key Principle:</span> Start with the simplest technology that solves the problem. Organizations that master simpler automation technologies before attempting AI have significantly higher success rates. Each successful implementation builds organizational capability and data infrastructure that supports more sophisticated applications.</p>
</div>

<div class="page-break"></div>

<!-- SECTION 5: WHY AI INITIATIVES FAIL -->
<div class="section-header">
    <div class="section-label">Section 5</div>
    <h2>Why AI Initiatives Fail</h2>
</div>

<p>The gap between AI potential and AI reality is wider than vendor marketing suggests. Understanding why initiatives fail is essential for realistic planning and resource allocation.</p>

<h3>The 95% Failure Rate</h3>

<p>In August 2025, MIT Media Lab's NANDA Initiative published comprehensive research examining AI adoption across enterprises. The findings were sobering: approximately 95% of generative AI pilots fail to progress from pilot to production with measurable return on investment.<span class="citation">[1]</span></p>

<p>The research methodology included 150 executive interviews, 350 employee surveys, and analysis of 300 public AI deployment announcements. Researchers tracked outcomes over 18 months to distinguish between announcements and actual production deployments with measured impact.</p>

<div class="stats-row">
    <div class="stat-box">
        <div class="stat-number" style="color: var(--dartmouth-green);">67%</div>
        <div class="stat-label">Success rate for<br><strong>vendor-led</strong> implementations<span class="citation">[1]</span></div>
    </div>
    <div class="stat-box">
        <div class="stat-number red">33%</div>
        <div class="stat-label">Success rate for<br><strong>internal build</strong> implementations<span class="citation">[1]</span></div>
    </div>
</div>

<div class="insight-box blue">
    <p><span class="insight-label">Critical Finding:</span> The primary barrier to successful AI deployment is not model quality or capability. Executives surveyed frequently cited technology limitations or regulatory constraints, but the research identified organizational factors as the actual failure drivers: data quality, integration complexity, and change management.<span class="citation">[1]</span></p>
</div>

<h3>Common Failure Patterns</h3>

<table>
    <tr>
        <th style="width: 18%;">Failure Pattern</th>
        <th style="width: 42%;">What Happens</th>
        <th style="width: 40%;">Warning Signs</th>
    </tr>
    <tr>
        <td><strong>Data Quality Issues</strong></td>
        <td>AI systems amplify existing data problems. Missing data, inconsistent formats, and outdated records that caused minor issues in reporting create major problems for AI. McKinsey research identifies data quality as the most frequently cited barrier to AI deployment.<span class="citation">[5]</span></td>
        <td>Analytics initiatives have struggled; multiple "sources of truth" exist; no clear data ownership; manual data reconciliation is common</td>
    </tr>
    <tr>
        <td><strong>Integration Complexity</strong></td>
        <td>Connecting AI tools to existing systems often takes longer than deploying the AI itself. Legacy systems with limited APIs, complex security requirements, and fragmented data landscapes create integration challenges that technical demonstrations do not reveal.<span class="citation">[3]</span></td>
        <td>Previous integrations were difficult; heavy reliance on manual data transfer; limited API capabilities; IT backlog is extensive</td>
    </tr>
    <tr>
        <td><strong>Change Management Failure</strong></td>
        <td>Technology that is not used delivers no value. AI tools often require workflow changes that employees resist or struggle to adopt. Microsoft research suggests it takes 11 weeks for users to fully realize productivity benefits from AI tools.<span class="citation">[29]</span></td>
        <td>Previous tools had low adoption; no training budget allocated; project driven by IT without business unit involvement</td>
    </tr>
    <tr>
        <td><strong>Unrealistic Expectations</strong></td>
        <td>Business cases assume AI replaces labor one-to-one. Reality is augmentation: AI handles some tasks, humans handle others, and the transition takes time. Rather than mass layoffs, companies are increasingly not backfilling positions as they become vacant, a much slower path to cost reduction.<span class="citation">[2]</span></td>
        <td>ROI projections based on headcount reduction; timeline measured in weeks; no pilot phase planned; stakeholders expect immediate results</td>
    </tr>
    <tr>
        <td><strong>Maintenance Underestimation</strong></td>
        <td>AI systems require ongoing monitoring, retraining, and adjustment. Models drift as data patterns change. Prompts need refinement as edge cases emerge. This operational cost is frequently overlooked in initial business cases.<span class="citation">[5]</span></td>
        <td>No operational budget allocated; success measured only at launch; no monitoring plan defined; maintenance responsibility unclear</td>
    </tr>
</table>
<p class="table-caption">Figure 7: Common AI failure patterns, causes, and warning signs</p>

<h3>What Successful Implementations Do Differently</h3>

<p>The MIT research also examined the 5% of initiatives that succeeded. Common patterns included:<span class="citation">[1][5]</span></p>

<ul>
    <li><strong>Narrow focus:</strong> Successful initiatives target specific, well-defined problems rather than broad "AI transformation." They answer the question: "What specific workflow will change, and how will we measure improvement?"</li>
    <li><strong>Back-office first:</strong> Despite receiving less executive attention, back-office automation (finance, operations, HR) shows higher success rates than customer-facing applications. These environments have more structured data, and lower tolerance for errors creates stronger testing discipline.</li>
    <li><strong>Integration investment:</strong> Successful organizations budget more for integration work than for AI technology itself. They recognize that connecting AI to existing systems is often the harder problem.</li>
    <li><strong>Business unit ownership:</strong> Adoption succeeds when driven by business units who understand the workflows, not by central AI labs or IT departments working in isolation.</li>
    <li><strong>Realistic timelines:</strong> Successful implementations plan for 6 to 18 months to reach production impact, including integration, testing, training, and adoption phases. They pilot before scaling.</li>
    <li><strong>Measured value beyond labor:</strong> Rather than focusing solely on headcount reduction, successful organizations measure quality improvements, speed increases, error reduction, and employee satisfaction.</li>
</ul>

<div class="page-break"></div>

<!-- SECTION 6: EVALUATING AI OPPORTUNITIES -->
<div class="section-header">
    <div class="section-label">Section 6</div>
    <h2>Evaluating AI Opportunities</h2>
</div>

<p>When evaluating AI products, vendors, or internal initiatives, certain patterns indicate elevated risk. This section provides frameworks for assessment.</p>

<h3>Warning Signs</h3>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 "It will replace your team"</span></p>
    <p>Claims of 80% or greater labor replacement are typically oversold. Research consistently shows AI augments human work rather than replacing it wholesale. Realistic productivity gains are 20 to 40 percent on specific tasks, with humans still required for judgment, exceptions, quality review, and the many tasks AI cannot handle.<span class="citation">[2][28]</span></p>
</div>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 "No integration required" or "Plug and play"</span></p>
    <p>Meaningful AI deployment requires connection to existing data and systems. Any vendor claiming their solution works without integration either does not understand enterprise environments or is not being forthright about implementation requirements.<span class="citation">[3]</span></p>
</div>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 "Our proprietary AI" (without specifics)</span></p>
    <p>Many products marketed as "proprietary AI" are thin interfaces built on top of foundation models (GPT-4, Claude) with minimal differentiation. This is not inherently problematic, but businesses should understand what they are actually purchasing. Ask specifically: What models does this use? What has been built beyond the base model?<span class="citation">[18]</span></p>
</div>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 "100% accuracy" or no discussion of errors</span></p>
    <p>All AI systems have error rates. Any vendor who denies this is either measuring incorrectly or being misleading. The relevant questions are: What is the error rate on realistic data? What types of errors occur? What happens downstream when errors occur?<span class="citation">[27]</span></p>
</div>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 "Implementation in weeks"</span></p>
    <p>Complex AI deployments that deliver measurable value typically take 6 to 18 months. Fast timelines may be appropriate for limited-scope pilots, but production deployments at scale require integration, testing, training, and organizational adoption, each of which takes time.<span class="citation">[1]</span></p>
</div>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 Pressure to decide quickly</span></p>
    <p>Legitimate opportunities do not require rushed decisions. Vendors creating artificial urgency, such as limited-time pricing or claims that competitors are moving faster, are often optimizing for their sales cycle rather than for customer success.</p>
</div>

<div class="red-flag">
    <p><span class="red-flag-title">🚩 No reference customers in your industry</span></p>
    <p>Proven success in one industry does not guarantee success in another. Ask for references from organizations with similar data environments, regulatory requirements, and use cases. Be wary of vendors who cannot provide relevant references.</p>
</div>

<h3>Due Diligence Questions</h3>

<p>For any significant AI investment, ensure clear answers to the following questions. Consider using the interactive AI Readiness Assessment to evaluate organizational preparedness across these dimensions.</p>

<ul class="checklist">
    <li><strong>Problem definition:</strong> What specific problem does this solve? How will success be measured? What is the baseline to compare against?</li>
    <li><strong>Data requirements:</strong> What data is required? Does the organization have this data in accessible, clean form? Who owns it? What are the privacy implications?</li>
    <li><strong>Integration scope:</strong> What systems must this connect to? Are APIs available? Who will build and maintain integrations? What is the realistic integration timeline?</li>
    <li><strong>Error handling:</strong> What happens when the AI is wrong? What is the blast radius of errors? How will errors be detected? Who is responsible for review?</li>
    <li><strong>Timeline realism:</strong> What is the realistic timeline including integration, testing, training, and adoption? What are the dependencies? What could delay the project?</li>
    <li><strong>Ongoing requirements:</strong> What maintenance, monitoring, and operational support will be required? What is the ongoing cost? Who is responsible?</li>
    <li><strong>Security and compliance:</strong> What data will the AI access? Where is it processed? What are the regulatory implications? Has legal and compliance reviewed?</li>
    <li><strong>Vendor dependency:</strong> If this vendor disappeared or significantly changed pricing, what would the organization do? Is there an exit strategy?</li>
    <li><strong>Change management:</strong> Who will use this? What training is required? Who is accountable for adoption? What happens if adoption is low?</li>
    <li><strong>Success criteria:</strong> What specific outcomes, measured how, would constitute success? What would trigger a decision to discontinue?</li>
</ul>

<div class="cta-box">
    <h4>Assess Your Organization's AI Readiness</h4>
    <p>Use the interactive AI Initiative Success Predictor to evaluate organizational preparedness across five research-backed dimensions: data infrastructure, transformation track record, integration architecture, change capacity, and use case clarity.</p>
    <a href="#assessment" class="cta-button">Take the Assessment →</a>
</div>

<h3>Risk Assessment Framework</h3>

<table>
    <tr>
        <th>Dimension</th>
        <th class="green">Lower Risk</th>
        <th class="red">Higher Risk</th>
    </tr>
    <tr>
        <td><strong>Scope</strong></td>
        <td>Single, well-defined use case</td>
        <td>Broad "AI transformation"</td>
    </tr>
    <tr>
        <td><strong>Data readiness</strong></td>
        <td>Clean, accessible, governed data exists</td>
        <td>Data quality unknown or poor</td>
    </tr>
    <tr>
        <td><strong>Integration</strong></td>
        <td>Modern systems with APIs</td>
        <td>Legacy systems, manual processes</td>
    </tr>
    <tr>
        <td><strong>Technology maturity</strong></td>
        <td>Proven approaches (ML classification, LLM assistance)</td>
        <td>Frontier technology (autonomous agents)</td>
    </tr>
    <tr>
        <td><strong>Error tolerance</strong></td>
        <td>Errors caught by humans, low stakes</td>
        <td>Errors costly, hard to detect</td>
    </tr>
    <tr>
        <td><strong>Organizational readiness</strong></td>
        <td>Prior successful technology adoption</td>
        <td>History of failed initiatives</td>
    </tr>
    <tr>
        <td><strong>Implementation approach</strong></td>
        <td>Vendor-led with domain expertise</td>
        <td>First-time internal build</td>
    </tr>
</table>
<p class="table-caption">Figure 8: Risk assessment framework for AI initiatives</p>

<div class="page-break"></div>

<!-- REFERENCES -->
<div class="section-header">
    <div class="section-label">References</div>
    <h2>Sources</h2>
</div>

<div class="reference"><span class="ref-num">[1]</span> MIT Media Lab NANDA Initiative. (2025). "The GenAI Divide: State of AI in Business 2025." Based on 150 executive interviews, 350 employee surveys, and analysis of 300 public AI deployment announcements.</div>

<div class="reference"><span class="ref-num">[2]</span> McKinsey Global Institute. (2023). "The Economic Potential of Generative AI: The Next Productivity Frontier." Analysis of 63 use cases across 16 business functions.</div>

<div class="reference"><span class="ref-num">[3]</span> Dost, G. and Kearns-Manolatos, D. (2023). "Unleashing Value from Digital Transformation: Paths and Pitfalls." Deloitte Insights. Analysis of 4,600+ companies' financial disclosures.</div>

<div class="reference"><span class="ref-num">[4]</span> Kane, G.C. et al. (2019). "Accelerating Digital Innovation Inside and Out: Agile Teams, Ecosystems, and Ethics." MIT Sloan Management Review and Deloitte Insights. Survey of 4,800+ managers, executives, and analysts.</div>

<div class="reference"><span class="ref-num">[5]</span> Chui, M., Hazan, E., et al. (2023). "The State of AI in 2023: Generative AI's Breakout Year." McKinsey & Company.</div>

<div class="reference"><span class="ref-num">[6]</span> Bain & Company. (2024). "Technology Report 2024: How AI Is Reshaping the Tech Industry." Analysis of AI infrastructure market dynamics.</div>

<div class="reference"><span class="ref-num">[7]</span> Iansiti, M. and Lakhani, K.R. (2020). "Competing in the Age of AI: Strategy and Leadership When Algorithms and Networks Run the World." Harvard Business Review Press.</div>

<div class="reference"><span class="ref-num">[8]</span> Kane, G.C. et al. (2015). "Strategy, not Technology, Drives Digital Transformation." MIT Sloan Management Review and Deloitte University Press.</div>

<div class="reference"><span class="ref-num">[9]</span> Davenport, T.H. (1998). "Putting the Enterprise into the Enterprise System." Harvard Business Review, July-August 1998.</div>

<div class="reference"><span class="ref-num">[10]</span> Gartner. (2023). "Magic Quadrant for Cloud Infrastructure and Platform Services." Market analysis of cloud computing providers.</div>

<div class="reference"><span class="ref-num">[11]</span> Davenport, T.H. and Harris, J.G. (2007). "Competing on Analytics: The New Science of Winning." Harvard Business School Press.</div>

<div class="reference"><span class="ref-num">[12]</span> Russell, S. and Norvig, P. (2020). "Artificial Intelligence: A Modern Approach." 4th Edition. Pearson.</div>

<div class="reference"><span class="ref-num">[13]</span> Hastie, T., Tibshirani, R., and Friedman, J. (2009). "The Elements of Statistical Learning." 2nd Edition. Springer.</div>

<div class="reference"><span class="ref-num">[16]</span> Vaswani, A. et al. (2017). "Attention Is All You Need." Advances in Neural Information Processing Systems (NeurIPS).</div>

<div class="reference"><span class="ref-num">[17]</span> Brown, T.B. et al. (2020). "Language Models are Few-Shot Learners." Advances in Neural Information Processing Systems (NeurIPS).</div>

<div class="reference"><span class="ref-num">[18]</span> Bommasani, R. et al. (2021). "On the Opportunities and Risks of Foundation Models." Stanford Institute for Human-Centered Artificial Intelligence.</div>

<div class="reference"><span class="ref-num">[19]</span> Wang, L. et al. (2024). "A Survey on Large Language Model based Autonomous Agents." arXiv:2308.11432.</div>

<div class="reference"><span class="ref-num">[20]</span> van der Aalst, W.M.P., Bichler, M., and Heinzl, A. (2018). "Robotic Process Automation." Business & Information Systems Engineering 60, 269-272.</div>

<div class="reference"><span class="ref-num">[21]</span> Grand View Research. (2024). "Robotic Process Automation Market Size Report, 2024-2030." Additional data from SMA Technologies 2024 financial services survey.</div>

<div class="reference"><span class="ref-num">[22]</span> Mori, S., Suen, C.Y., and Yamamoto, K. (1992). "Historical Review of OCR Research and Development." Proceedings of the IEEE 80(7).</div>

<div class="reference"><span class="ref-num">[23]</span> Fielding, R.T. (2000). "Architectural Styles and the Design of Network-based Software Architectures." Doctoral dissertation, University of California, Irvine.</div>

<div class="reference"><span class="ref-num">[24]</span> Strubell, E., Ganesh, A., and McCallum, A. (2019). "Energy and Policy Considerations for Deep Learning in NLP." Proceedings of the 57th Annual Meeting of the ACL.</div>

<div class="reference"><span class="ref-num">[25]</span> Epoch AI. (2024). "Trends in Machine Learning Hardware and Compute." Research report on AI training costs.</div>

<div class="reference"><span class="ref-num">[26]</span> Verified Market Research. (2024). "AI Chip Market Size and Forecast." Industry analysis report.</div>

<div class="reference"><span class="ref-num">[27]</span> Ji, Z. et al. (2023). "Survey of Hallucination in Natural Language Generation." ACM Computing Surveys 55(12).</div>

<div class="reference"><span class="ref-num">[28]</span> Peng, S. et al. (2023). "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot." arXiv:2302.06590.</div>

<div class="reference"><span class="ref-num">[29]</span> Microsoft Research. (2023). "AI Productivity Research: Time to Value Analysis." Internal research publication.</div>

<div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    <h3>About Break it Down</h3>
    <p>Break it Down is a series of primers that examine complex systems and break them into digestible components. Each primer is designed to give intelligent readers, regardless of prior exposure to the topic, the understanding needed to ask informed questions and make better decisions.</p>

    <h3 style="margin-top: 20px;">About the Author</h3>
    <p>Hailey is an engineer by training and an investment banking analyst by profession. She holds degrees in Engineering Sciences, Operations & Systems Engineering, and a Master's in Operations Research from Dartmouth College. She currently works at Morgan Stanley covering technology and infrastructure sectors.</p>
</div>

<div class="footer">
    <p>This document is for informational purposes only and does not constitute professional advice.<br>Views expressed are personal and do not represent the views of any employer.</p>
    <p>© 2025 Break it Down. All rights reserved.</p>
</div>


