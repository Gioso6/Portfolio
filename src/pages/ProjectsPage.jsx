import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ProjectCard from '../components/home/ProjectCard';
import ProjectDetail from '../components/projects/ProjectDetail';

const containerShadow = '0 18px 40px rgba(0, 0, 0, 0.18)';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  padding: 2.5rem 2rem 4rem;
  align-items: start;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'linear-gradient(145deg, #0e1625, #0a0f1a)'
      : 'linear-gradient(145deg, #f7f9fc, #edf1f7)'};
  min-height: calc(100vh - 120px);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 96px;
  align-self: start;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  box-shadow: ${containerShadow};
  border: 1px solid rgba(0, 0, 0, 0.04);
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  @media (max-width: 960px) {
    position: relative;
    top: 0;
    max-height: none;
  }
`;

const SidebarTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;
`;

const ProjectListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ active }) => (active ? 'rgba(97, 218, 251, 0.14)' : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.colors.text : theme.colors.muted)};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  border: 1px solid ${({ active }) => (active ? 'rgba(97, 218, 251, 0.55)' : 'transparent')};
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  pointer-events: ${({ active }) => (active ? 'none' : 'auto')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    background: rgba(97, 218, 251, 0.1);
  }
`;

const ProjectsContainer = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: ${containerShadow};
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
`;

const TagFilterBar = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.75rem 0 1.25rem;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: #0f172a;
`;

const SliderInput = styled.input`
  width: 100%;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const TagFilterButton = styled.button`
  border: 1px solid ${({ active, color }) => (active ? color : 'rgba(15, 23, 42, 0.08)')};
  background: ${({ active, color }) => (active ? color : '#ffffff')};
  color: ${({ active }) => (active ? '#0f172a' : '#334155')};
  padding: 0.55rem 0.9rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? '0 12px 24px rgba(0, 0, 0, 0.12)' : '0 6px 14px rgba(0, 0, 0, 0.06)')};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
  }
`;

const ProjectsScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.75rem 0.25rem 0.75rem 0.75rem;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 8%,
    #000 22%,
    #000 78%,
    rgba(0, 0, 0, 0.7) 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 8%,
    #000 22%,
    #000 78%,
    rgba(0, 0, 0, 0.7) 92%,
    transparent 100%
  );

  @media (max-width: 960px) {
    max-height: none;
    -webkit-mask-image: none;
    mask-image: none;
  }
`;

const ProjectWrapper = styled.div`
  border-radius: 14px;
  transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.4s ease;
  transform: ${({ isHovered }) => (isHovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)')};
  box-shadow: ${({ isHovered }) => (isHovered ? '0 22px 45px rgba(0, 0, 0, 0.18)' : '0 10px 24px rgba(0, 0, 0, 0.12)')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.65)};
  cursor: pointer;
`;

const OverlayBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(12, 18, 34, 0.5);
  backdrop-filter: blur(6px);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1200;
`;

const bookOpen = keyframes`
  from {
    transform: scaleX(0.2) rotateY(-10deg);
    opacity: 0;
  }
  to {
    transform: scaleX(1) rotateY(0deg);
    opacity: 1;
  }
`;

const ProjectOverlay = styled.div`
  position: fixed;
  inset: 80px 4vw 48px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.28);
  overflow-y: auto;
  z-index: 1300;
  transform-origin: left center;
  animation: ${bookOpen} 0.7s ease forwards;

  @media (max-width: 720px) {
    inset: 72px 1rem 24px;
    border-radius: 16px;
  }
`;

const OverlayContent = styled.div`
  min-height: 100%;
`;

const tagColors = {
  'Automation': '#f6d365',
  'IIoT': '#9be7ff',
  'AI/ML': '#d0bdf4',
  'Web Dev': '#a0e8af',
  'Edge Computing': '#ffb3c1',
  'Mechanical': '#ffd8a8',
  'Electrical': '#b8c0ff',
  'Robotics': '#fbbf24',
  'Python': '#38bdf8',
  'C/C++': '#94a3b8',
  'Research': '#a78bfa',
  'Matlab': '#b38e8eff',
};

const allProjects = [
  {
    id: 'holweg-final-year-project',
    title: 'Implementation of an AI-Based Quality Control System for a Paper-bag Production Line on Edge',
    subtitle: 'AI-Based Quality Control System on Edge',
    description: 'Optimize machine parameters to reduce paper tear, thus leading to less waste and downtime.',
    imageUrl: 'images/prjct/prjct_holweg-final-year-project/default.jpg',
    tags: ['Automation', 'IIoT', 'AI/ML', 'Edge Computing'],
    year: 2025,
    duration: '7 months',
    timeline: '2025 • 7 months',
    longDescription:
      (
      <>
        <h3>INTRODUCTION</h3>
        <p>
          The transition towards Industry 5.0 represents a paradigm shift in manufacturing, emphasizing not only automation 
          and efficiency but also the collaboration between humans and intelligent systems. In the context of 
          high-speed paper bag manufacturing, HolwegWeber stands as a leader, particularly with its RS26 machine series.
          However, the complexity of these machines presents a significant operational challenge: the "tube formation" process. 
          This critical stage involves subjecting the paper web to localized stresses to shape it into a tube. Due to the dynamic 
          properties of paper (varying elasticity, grammage) and the multitude of mechanical settings, predicting the material's 
          behavior through standard multi-physical simulations is nearly impossible. Consequently, the machine setup currently 
          relies heavily on the empirical expertise of operators—specifically their auditory and tactile senses—to fine-tune 
          parameters. This dependency makes the process time-consuming, subjective, and difficult to transfer to new employees.
        </p>
        <p>
          The primary industrial pain point addressed in this project is the occurrence of paper breaks ("casses-papier") due 
          to suboptimal settings or wear. These interruptions cause significant downtime, material waste, and economic loss. As 
          production speeds increase, the window for manual reaction shrinks, necessitating an automated solution. This project 
          was conceived to bridge the gap between traditional mechanical engineering and modern data science. The goal was to 
          design an embedded Artificial Intelligence system capable of monitoring the machine's health in real-time. By analyzing 
          complex signal signatures that are often imperceptible to the human eye—such as micro-variations in motor torque or 
          specific acoustic frequencies—the system aims to detect anomalies before a failure occurs. This initiative serves as a 
          foundational proof-of-concept for HolwegWeber’s broader strategy to implement predictive maintenance and smart operator 
          assistance systems, moving from reactive troubleshooting to proactive process optimization.
        </p>

        <img src="images/prjct/prjct_holweg-final-year-project/flexible_web.png" alt="Industrial Context" className="my-6 w-full rounded-lg" />

        <h3>OBJECTIVES</h3>
        <p>
          The overarching objective of this Master's thesis was to develop a robust, multimodal AI architecture capable of 
          diagnosing the state of the RS26 machine and estimating the quality of the settings. This can be broken down into 
          several specific technical and operational goals. First, from a data acquisition perspective, the objective was to 
          identify and characterize the most discriminative signals. This involved a comparative study between internal 
          telemetry—specifically motor torque, position, and velocity extracted via the Simotion controller at 250Hz—and external 
          instrumentation, including high-frequency vibration analysis (48kHz) and acoustic monitoring (96kHz). The challenge was 
          to determine if the internal sensors alone, which require no additional hardware cost, could provide sufficient 
          granularity for anomaly detection, or if external sensor fusion was strictly necessary.
        </p>
        <p>
          Secondly, the project aimed to develop and benchmark various Machine Learning and Deep Learning architectures. The 
          specific target was to move beyond simple threshold-based alarms to sophisticated anomaly detection and classification. 
          This required exploring unsupervised learning methods, such as Autoencoders and Variational Autoencoders (VAE), to model 
          the "healthy" state of the machine and detect deviations. Simultaneously, supervised classification models were needed 
          to categorize specific defect types (e.g., incorrect tension, component wear). A crucial sub-objective was to address 
          the scarcity of labeled fault data in an industrial setting by implementing Transfer Learning and Few-Shot Learning techniques, 
          ensuring the model could generalize to new machine configurations with minimal re-training. Finally, the project aimed 
          to deliver a deployable, embedded solution. This meant not just training a model in a vacuum, but integrating it into an 
          industrial Edge Gateway (Belden Hirschmann), orchestrating the data flow via OPC UA, and visualizing the diagnostics for 
          the machine operators in real-time.
        </p>

        <h3>METHOD</h3>
        <p>
          The methodological approach was structured around a rigorous data processing pipeline, moving from raw signal acquisition 
          to advanced feature extraction and model inference. The data acquisition phase involved synchronizing multi-source data. 
          For the internal motor data, specific "ServoSynchronousTasks" were implemented within the Simotion controller to ensure 
          deterministic sampling at 4ms intervals. For external sensing, piezoelectric accelerometers and directional microphones 
          were deployed at critical mechanical junctions, such as the tear-off and holding axes.
        </p>
        <p>
          A significant portion of the methodology focused on <strong>Signal Preprocessing and Feature Engineering</strong>. Given 
          the non-stationary nature of the signals, time-domain analysis proved insufficient. Consequently, I transformed the 1D 
          time-series data into 2D time-frequency representations. For vibration data, <strong>Scalograms</strong> (Continuous Wavelet Transform) 
          were generated to capture transient events with high temporal resolution. For acoustic data, <strong>Mel-Spectrograms </strong>  
          were computed to mimic human auditory perception, aligning the AI's input with the expert operator's hearing. For the motor 
          torque data, a novel "Multiview" approach was adopted to handle the multivariate nature of the six different axes simultaneously 
          without one axis dominating the latent space representation.
        </p>

        <img src="images/prjct/prjct_holweg-final-year-project/model_architecture.png" alt="AI Architecture Diagram" className="my-6 w-full rounded-lg" />

        <p>
          The core AI development involved two distinct architectural families. For anomaly detection, <strong>Convolutional Variational 
            Autoencoders (CVAE)</strong> were designed. These models compress the input images (spectrograms) into a probabilistic latent 
            space <i>z</i> and attempt to reconstruct them. The reconstruction error (RMSE) and the Kullback-Leibler divergence served as 
            the anomaly score. By analyzing the latent space distribution using t-SNE, I could visualize the separation between healthy 
            and faulty states. For fault classification, deep Convolutional Neural Networks (CNNs) were employed. I utilized Transfer 
            Learning by leveraging pre-trained models (ResNet34, VGG16, DenseNet121) originally trained on ImageNet. The final layers were 
            fine-tuned on our specific industrial dataset. A "Few-Shot Learning" approach was also prototyped, using a hybrid VAE with a 
            classification head to identify new fault types with very few examples, addressing the "cold start" problem common in manufacturing.
        </p>

        <h3>RESULTS</h3>
        <p>
          The results of this study demonstrated the high viability of Deep Learning for industrial process optimization. The evaluation 
          of the models revealed distinct performance tiers based on the input data modality. The analysis of <strong>acoustic data</strong> 
          via Mel-Spectrograms fed into a DenseNet121 architecture yielded the highest performance, achieving a classification accuracy of 
          over <strong>83.5%</strong> in identifying specific setup faults. This confirmed the hypothesis that acoustic signatures contain 
          highly discriminative features regarding the machine's operating state, effectively replicating the "ear" of the expert setter. 
          The vibration analysis using Scalograms also showed promise but was more sensitive to sensor placement, achieving high accuracy 
          only when sensors were optimally positioned near the tear-off mechanism.
        </p>
        <p>
          Regarding the internal Simotion data (motor torque), the <strong>Multiview Autoencoder</strong> approach proved successful. By 
          separating the encoder/decoder branches for each axis while sharing a concatenated latent space, the model achieved a reconstruction 
          capability that treated all axes equitably. This resulted in a robust anomaly detection system capable of identifying deviations 
          in the mechanical transmission without external sensors, offering a cost-effective solution for basic monitoring.
        </p>

        <img src="images/prjct/prjct_holweg-final-year-project/tsne_cluster.png" alt="t-SNE Clusters" className="my-6 w-full rounded-lg" />
        <img src="images/prjct/prjct_holweg-final-year-project/results.png" alt="Confusion Matrix" className="my-6 w-full rounded-lg" />

        <p>
          On the deployment side, the project successfully delivered a functional prototype on the Belden OpEdge 8D gateway. The software 
          stack was fully containerized using Docker. It included a Node-RED container for handling OPC UA communication (reading from the 
          PLC, writing predictions back), a Python container for the AI inference (using PyTorch/TensorFlow), and a storage volume for maintaining 
          model versions. The system demonstrated the capability to infer the machine state in near real-time and display a confidence score 
          on the machine's HMI, validating the full end-to-end pipeline from sensor to operator feedback.
        </p>

        <h3>STRUGGLES & WHAT'S NEXT</h3>
        <p>
          Despite the successes, the project faced significant engineering challenges. The primary struggle was <strong>Data Scarcity and Quality</strong>. 
          In an industrial environment, "faulty" data is rare because machines are designed to run correctly. Generating a balanced dataset 
          required deliberate sabotage of settings, which was time-constrained by machine availability. Furthermore, the "Catastrophic Forgetting" 
          phenomenon in neural networks was a theoretical hurdle for the incremental learning aspect; updating the model with new faults without 
          degrading its performance on previous ones remains a complex challenge. Hardware limitations also played a role; training complex CNNs 
          and VAEs on local hardware without high-end GPUs resulted in long iteration cycles (up to 12 hours for certain grid searches).
        </p>
        <p>
          Looking forward, several avenues are proposed for the industrialization of this solution. First, expanding the dataset is critical; a 
          fleet-wide data collection strategy across multiple client machines would improve the model's generalization capabilities. Technically, 
          moving towards <strong>Reinforcement Learning (RL)</strong> is the logical next step. Instead of just diagnosing a fault, an RL agent 
          could actively propose parameter corrections to the operator, or even autonomously adjust the servo-motors to return to an optimal state 
          (closed-loop control). Additionally, implementing a robust MLOps pipeline is necessary to manage model versioning and drift detection 
          in production. Finally, from a hardware perspective, integrating the AI acceleration directly into the PLC or using specialized edge AI chips 
          (like NVIDIA Jetson) could further reduce latency, enabling the system to react within a single machine cycle.
        </p>
      </>
    ),
  },
  {
    id: 'academic-last-year-project',
    title: 'Predictive Maintenance and Anomaly Detection of Milling Process through Vibration Analysis',
    subtitle: 'AI-Based Tool Condition Monitoring',
    description: 'Conduct research on vibration-based tool condition monitoring for predictive maintenance in milling machines.',
    imageUrl: 'images/prjct/prjct_academic-last-year-project/default.png',
    tags: ['AI/ML', 'Research', 'Python'],
    year: 2025,
    duration: '3 months',
    timeline: '2025 • 3 months',
    longDescription:
      (<>
        <h3>INTRODUCTION</h3>
        <p>
          In the era of Industry 4.0, the reliability and efficiency of manufacturing processes are paramount. Predictive maintenance 
          has emerged as a critical strategy to minimize downtime and optimize tool usage. This academic project, conducted as part of 
          the Master's program in Mechatronics, Energy, and Intelligent Systems, focused on the application of Artificial Intelligence 
          to the monitoring of machining tools. Specifically, the project targeted two key objectives: Anomaly Detection (AD) 
          and Remaining Useful Life (RUL) estimation. Machining processes, such as milling, generate complex vibration signals that 
          contain rich information about the tool's health. Traditional methods often rely on threshold-based monitoring or manual inspection, 
          which can be reactive or subjective. This project aimed to leverage data-driven approaches to automate this monitoring.
        </p>
        <p>
          The context of the project was defined by the availability of high-frequency vibration datasets from CNC machines, provided 
          by both open-source repositories and internal university research. The challenge lay in processing these non-stationary signals 
          to extract meaningful features that correlate with tool wear. Unlike simple systems where faults might be binary, tool wear is 
          a gradual degradation process, requiring sophisticated regression models for RUL estimation. simultaneously, sudden anomalies 
          (like tool breakage or chatter) require robust classification or unsupervised detection mechanisms. This duality necessitated 
          a hybrid AI approach, combining supervised learning for RUL (where labeled wear data exists) and unsupervised learning for anomaly 
          detection (where faults are rare and diverse). The project served as a comprehensive study into the feasibility of deploying Deep 
          Learning models for real-time industrial monitoring.
        </p>

        

        <img src="images/prjct/prjct_academic-last-year-project/intro.png" alt="Vibration spectrum analysis" />

        <h3>OBJECTIVES</h3>
        <p>
          The primary objective of this project was to design, implement, and evaluate AI models capable of diagnosing the state of a 
          machining tool from raw vibration data. This overarching goal was decomposed into several specific technical targets. First, for 
          Anomaly Detection, the aim was to build a model that could distinguish between "healthy" machining operations and those exhibiting 
          anomalies without relying on explicit fault labels during training. This unsupervised approach is critical in industrial settings 
          where "faulty" data is scarce. The metric for success here was high precision and recall in identifying deviations from normal 
          operating conditions.
        </p>
        <p>
          Second, for RUL estimation, the objective was to predict the continuous wear level of the tool (flank wear width) and estimating 
          the remaining time before failure. This required a supervised learning approach capable of mapping complex temporal or spectral 
          patterns to a scalar wear value. A key sub-objective was to explore <strong>Transfer Learning (TL)</strong>. The goal was to determine 
          if a model trained on a large dataset (e.g., machining steel) could be effectively adapted to a new, smaller dataset (e.g., machining aluminum) 
          with minimal re-training. This is a crucial capability for scalability in factories with diverse machine tools and materials. Finally, 
          the project aimed to benchmark different neural network architectures—specifically contrasting recurrent networks like LSTMs with 
          convolutional autoencoders (CAEs)—to identify the most effective architecture for processing high-frequency vibration time-series data.
        </p>

        <h3>METHOD</h3>
        <p>
          The methodology was grounded in a rigorous data science pipeline. Data preparation was the first critical step. We utilized multiple 
          datasets, including the "Smart Data Collection System for Brownfield CNC Milling Machines" and internal lab data. Preprocessing 
          involved signal normalization (MinMax scaling), DC component removal, and sliding window segmentation to create consistent input samples 
          (e.g., 50 windows per signal). Feature engineering was explored in two directions: extraction of statistical time-domain features 
          (RMS, Kurtosis, Crest Factor) and transformation into the frequency domain via Fast Fourier Transform (FFT) and Log-Spectrograms.
        </p>
        <p>
          For <strong>Anomaly Detection</strong>, we adopted an unsupervised Deep Learning strategy. We designed a <strong>Convolutional 
            Variational Autoencoder (CVAE)</strong>. The model was trained solely on "healthy" vibration data to learn a compressed latent 
            representation (<i>z</i>) of normal operations. Anomalies were then detected by measuring the reconstruction error (MSE) and analyzing 
            the distribution of data points in the latent space using the Mahalanobis distance. We also experimented with K-Means clustering on 
            spectral features as a baseline comparison.
        </p>

        

        <img src="images/prjct/prjct_academic-last-year-project/method.png" alt="Neural network autoencoder diagram" />

        <p>
          For <strong>RUL Estimation</strong>, we treated the problem as a regression task. We implemented a <strong>Convolutional Autoencoder 
            with a Fully Connected head (CAE-FC)</strong>. Unlike standard autoencoders that only reconstruct the input, our architecture included 
            a regression branch attached to the latent space to predict the scalar wear value directly. This "multi-task" learning forced the 
            encoder to learn features that were both representative of the signal structure and predictive of the tool condition. We also benchmarked 
            <strong>Long Short-Term Memory (LSTM)</strong> networks to capture temporal dependencies in the degradation path. Finally, Transfer 
            Learning was implemented by pre-training the CAE-FC on a large "source" dataset and fine-tuning the weights on a smaller "target" dataset 
            (different material), freezing the early convolutional layers to retain feature extraction capabilities.
        </p>

        <h3>RESULTS</h3>
        <p>
          The experimental results highlighted the superiority of image-based Deep Learning methods over traditional time-series analysis for 
          this specific domain. In <strong>Anomaly Detection</strong>, the CVAE model trained on <strong>Log-Spectrogram images</strong> achieved 
          an impressive accuracy of <strong>98%</strong> when coupled with a dynamic thresholding strategy based on the Mahalanobis distance. The 
          use of Log-Spectrograms proved crucial, as they captured transient spectral features that were lost in simple FFT averages. The latent 
          space visualization (using t-SNE) showed clear separation between healthy and anomalous clusters, validating the model's ability to learn 
          discriminative features unsupervised.
        </p>
        <p>
          For <strong>RUL Estimation</strong>, the <strong>CAE-FC architecture</strong> outperformed the LSTM models. On the primary dataset, 
          the model predicted the tool wear with a Mean Squared Error (MSE) of approximately 2.3, corresponding to an error margin of less than 
          <strong>1.5%</strong>. The predicted wear curves closely followed the ground truth degradation paths, even capturing the accelerated 
          wear phases near the end of the tool's life.
        </p>

        
        <img src="images/prjct/prjct_academic-last-year-project/results_1.png" alt="RUL Prediction Results" />
        <img src="images/prjct/prjct_academic-last-year-project/results_2.png" alt="RUL Prediction Results" />

        <p>
          The <strong>Transfer Learning</strong> experiments yielded mixed but promising results. Direct transfer without fine-tuning failed due 
          to significant domain shifts between datasets. However, a "Generalize then Specialize" approach—training a foundational model on a combined 
          dataset and then fine-tuning on specific materials—proved effective. We achieved reasonable RUL prediction on new datasets with 
          significantly reduced training times (e.g., 30 seconds vs. 1 hour), although the absolute accuracy was slightly lower (approx. 90%) 
          compared to models trained from scratch on full datasets.
        </p>

        <h3>STRUGGLES & WHAT'S NEXT</h3>
        <p>
          The project encountered several significant hurdles. <strong>Data quality and consistency</strong> were major issues; open-source datasets 
          often lacked consistent labeling or had varying sampling rates, requiring extensive and time-consuming normalization. The "black box" 
          nature of neural networks also posed a challenge in interpretability; understanding *why* the model flagged a specific signal as an anomaly 
          was difficult without advanced visualization tools. Hardware limitations constrained our ability to perform extensive hyperparameter 
          optimization (grid search) for the complex CVAE models, limiting us to manual tuning of learning rates and latent space dimensions.
        </p>
        <p>
          Looking ahead, several future directions are identified. To improve the Transfer Learning performance, exploring 
          <strong>Domain Adaptation</strong> techniques (like Maximum Mean Discrepancy) could help align the feature distributions of source and 
          target domains more effectively. Implementing <strong>Attention Mechanisms</strong> within the architecture could improve interpretability 
          by highlighting the specific time-frequency regions responsible for an anomaly detection. Furthermore, validating these models on an embedded 
          edge device (like a Raspberry Pi or NVIDIA Jetson) is the logical next step to prove their viability for real-time, on-machine monitoring 
          in a factory environment, moving from offline analysis to online inference.
        </p>
      </>
    ),
  },
  {
    id: 'hackathon-unistra',
    title: 'UNISTRA Data Challenge/Hackathon: Anomaly Detection in Industrial Sensor Data',
    subtitle: 'UNISTRA 2025 Data Challenge',
    description: 'A 48 hour hackathon to develop a time-series anomaly detection system for an unknown industrial sensor data.',
    imageUrl: 'images/prjct/prjct_hackathon-unistra/default.png',
    tags: ['AI/ML', 'Research', 'Matlab', 'C/C++'],
    year: 2025,
    duration: '48 hours',
    timeline: '2025 • 48 hours',
    longDescription:
      (
      <>
        <h3>INTRODUCTION</h3>
        <p>
          The exponential growth of industrial IoT has led to a deluge of time-series data from machinery, creating a critical need for automated 
          health monitoring systems. This project, undertaken during the 2024 University of Strasbourg Hackathon, addressed a fundamental challenge 
          in signal processing: identifying anomalies in unlabeled, highly similar time-series datasets. The specific task was to classify a set of 
          six vibration signals (labeled A through F) to distinguish the "healthy" baseline from various "faulty" states, with the only prior knowledge 
          being that Signal A represented a healthy reference.
        </p>
        <p>
          The complexity of the problem stemmed from the subtle nature of the faults. Initial time-domain analysis revealed that the raw signals were 
          visually indistinguishable, exhibiting high-frequency oscillations with similar amplitudes and envelopes. This necessitated a shift to the 
          frequency domain. By computing the Fast Fourier Transform (FFT) on sliding windows, we uncovered distinct spectral signatures—such as 
          missing harmonic peaks or shifts in spectral density—that were invisible in the temporal domain. This project served as a rigorous benchmark 
          of multiple unsupervised learning techniques, comparing their efficacy in clustering high-dimensional spectral data without ground truth labels.
        </p>

        <img src="images/prjct/prjct_hackathon-unistra/intro.png" alt="Spectral analysis plot" />

        <h3>OBJECTIVES</h3>
        <p>
          The primary objective was to develop a robust, unsupervised classification pipeline capable of correctly identifying the healthy signal 
          among a set of unknown signals. This high-level goal was broken down into several technical sub-objectives. First, we aimed to determine 
          the optimal data representation for this specific type of vibration signal. We hypothesized that frequency-domain features would be more 
          discriminative than time-domain statistics, and we sought to validate this by comparing clustering performance on both feature sets.
        </p>
        <p>
          The second objective was to evaluate and compare the performance of different unsupervised anomaly detection algorithms. We selected a 
          diverse set of methods to cover different mathematical intuitions: <strong>reconstruction-based detection</strong> (using Autoencoders), 
          <strong>forecasting-based detection</strong> (using LSTMs), <strong>distance-based clustering</strong> (using K-Means and Spectral Distance), 
          and <strong>isolation-based detection</strong> (using Isolation Forest). A key success metric was the consensus among these different 
          models; if multiple independent algorithms pointed to the same signal as being "healthy" (i.e., most similar to Signal A), we could assert 
          our conclusion with high confidence. Finally, the project aimed to characterize the nature of the anomalies themselves, determining if 
          they represented a single type of fault or multiple distinct failure modes.
        </p>

        <h3>METHOD</h3>
        <p>
          Our methodology began with a comprehensive feature extraction phase. We applied a sliding window approach to the raw time-series data, 
          segmenting each signal into 50 overlapping windows. For each window, we computed the FFT to generate a spectral profile. We also extracted 
          scalar features from these spectra, including spectral mean, variance, energy, skewness, and kurtosis. This resulted in a high-dimensional 
          dataset where each data point represented the spectral characteristics of a specific time segment.
        </p>
        <p>
          We then implemented four distinct algorithmic approaches. First, for <strong>LSTM Forecasting</strong>, we trained a model on the healthy 
          Signal A to predict future time-steps. The hypothesis was that the model would fail to predict the values of anomalous signals, resulting 
          in a high prediction error. Second, we built an <strong>Autoencoder (AE)</strong> trained to reconstruct the FFT spectra of Signal A. We 
          used the Root Mean Square Error (RMSE) of the reconstruction as an anomaly score. Third, we utilized <strong>K-Means Clustering</strong>. 
          To handle the high dimensionality of the raw spectra, we first applied <strong>Principal Component Analysis (PCA)</strong> to retain 98% 
          of the variance before feeding the reduced vectors into the K-Means algorithm. Finally, we calculated the <strong>Cosine Distance</strong> 
          between the spectral vectors of Signal A and all other signals to directly quantify similarity in the high-dimensional feature space.
        </p>

        <img src="images/prjct/prjct_hackathon-unistra/method.png" alt="Bar chart of RMSE values" />

        <h3>RESULTS</h3>
        <p>
          The multi-model approach yielded a converging conclusion. The <strong>Autoencoder</strong> analysis was particularly revealing; the 
          reconstruction error (RMSE) for Signal B was consistently low and comparable to the baseline Signal A, whereas Signals C, E, and F exhibited 
          significantly higher errors. This strongly suggested that Signal B was the other "healthy" instance. The <strong>K-Means clustering</strong> 
          on PCA-reduced spectral data corroborated this. When set to partition the data into two clusters, the algorithm consistently grouped 
          Signal B with Signal A, while segregating the others into a separate "anomaly" cluster.
        </p>
        <p>
          The <strong>Spectral Distance</strong> analysis provided further granularity. By plotting the cosine distance of each signal relative to 
          the mean spectrum of Signal A, we observed distinct distance plateaus. This not only confirmed Signal B's similarity to A but also revealed 
          that the anomalies were likely multimodal—Signals C and F clustered together, while Signal E formed its own distinct cluster, suggesting 
          the presence of at least two different types of faults. The <strong>LSTM Forecasting</strong> method, while technically functional, proved 
          less discriminative for this specific dataset, highlighting the superiority of reconstruction and distance-based methods for spectral anomaly 
          detection.
        </p>

        <h3>STRUGGLES & WHAT'S NEXT</h3>
        <p>
          The main challenge encountered was the "curse of dimensionality" when dealing with raw FFT data. Initial attempts to cluster the full 
          spectral vectors resulted in poor separation due to the sparsity and noise in high-frequency bins. We overcame this by implementing PCA 
          dimensionality reduction, which was a critical step for the success of the K-Means algorithm. Another struggle was the lack of ground truth 
          labels, which made hyperparameter tuning (like selecting the number of clusters $k$ or the latent dimension of the AE) inherently subjective 
          and reliant on heuristic methods like the "Elbow Method" or reconstruction loss plateaus.
        </p>
        <p>
          Future work would focus on enhancing the robustness of the anomaly classification. We propose moving from simple K-Means to density-based 
          clustering algorithms like <strong>DBSCAN</strong> or <strong>HDBSCAN</strong>, which do not require specifying the number of clusters a 
          priori and can handle noise better. Additionally, exploring <strong>Contrastive Learning</strong> techniques (like SimCLR) could allow the 
          model to learn even more robust feature representations by maximizing agreement between differently augmented views of the same spectral 
          window. Finally, validating these findings on a larger dataset with verifiable ground truth would be essential to confirm the specific 
          physical nature of the detected faults.
        </p>
      </>
    ),
  },
  {
    id: 'ROS-tb3',
    title: 'Autonomous Mobile Robot (AMR) with TurtleBot3 and ROS',
    subtitle: 'Autonomous Mobile Robot with ROS',
    description: 'Development of an autonomous mobile robot using TurtleBot3 and Robot Operating System (ROS) for navigation and obstacle avoidance.',
    imageUrl: 'images/prjct/prjct_ros-tb3/default.jpg',
    tags: ['Robotics', 'ROS', 'Python', 'C/C++'],
    year: 2024,
    duration: '6 months',
    timeline: '2024 • 6 months',
    longDescription:
      (
      <>
        <h3>INTRODUCTION</h3>
        <p>
          The paradigm shift from automated fixed infrastructure to flexible internal logistics has accelerated the adoption of Autonomous Mobile Robots 
          (AMRs). Unlike Automated Guided Vehicles (AGVs), which rely on physical guides like magnetic tapes or wires, AMRs navigate dynamically through 
          unstructured environments using onboard intelligence. This project, conducted during the first year of the Master's degree in Mechatronics and 
          Energy, aimed to design, engineer, and program a modular AMR from the ground up. The central challenge was to bridge the gap between low-level 
          embedded control and high-level cognitive robotics within the ecosystem of <strong>Robot Operating System 2 (ROS2)</strong>.
        </p>
        <p>
          The project was contextualized by the need for a robust, scalable research platform capable of validating complex path planning and perception 
          algorithms. Industrial AMRs are typically "black boxes"; therefore, building an open-source architecture was essential for academic 
          experimentation. The system needed to handle the rigors of real-time constraints—balancing the heavy computational load of Simultaneous 
          Localization and Mapping (SLAM) with the deterministic requirements of motor control. By leveraging a heterogeneous computing architecture 
          (Single Board Computer + Microcontroller), we aimed to create a robot capable of mapping unknown environments and navigating them autonomously 
          while avoiding dynamic obstacles.
        </p>

        <img src="images/prjct/prjct_ros-tb3/intro.png" alt="Hardware Architecture" className="my-6 w-full rounded-lg" />

        <h3>OBJECTIVES</h3>
        <p>
          The primary technical objective was to master and implement the <strong>ROS2 middleware</strong> (specifically the Foxy/Humble distributions). 
          Unlike ROS1, ROS2 utilizes the Data Distribution Service (DDS) for real-time communication, eliminating the single point of failure of the 
          "Master" node. Our goal was to exploit this distributed architecture to create decoupled nodes for perception, navigation, and control.
        </p>
        <p>
          Specific engineering goals included:
          <ul className="list-disc ml-6 mt-2">
            <li><strong>Hardware Abstraction:</strong> Developing a robust communication bridge between the high-level planner (running on a Raspberry 
            Pi 4) and the low-level actuator controller (OpenCR board based on ARM Cortex-M7).</li>
            <li><strong>Perception & Localization:</strong> Integrating a 360° LiDAR (LDS-01) to implement 2D SLAM, allowing the robot to construct 
            an Occupancy Grid Map of its environment while simultaneously tracking its pose (<i>x, y, \theta</i>) via odometry and scan matching.</li>
            <li><strong>Navigation Stack Implementation:</strong> Configuring the ROS2 Navigation2 (Nav2) stack, which involves tuning the costmaps 
            (global and local), configuring the behavior trees for recovery actions, and selecting appropriate path planning algorithms (e.g., A* 
            for global, DWA/TEB for local).</li>
          </ul>
        </p>

        <h3>METHOD</h3>
        <p>
          The system architecture was designed as a distributed computing network. The "Brain" of the robot was a <strong>Raspberry Pi 4</strong> 
          running Ubuntu Mate, responsible for heavy tasks: LiDAR driver execution, SLAM (using Cartographer or SLAM Toolbox), and path planning. 
          The "Reflexes" were managed by an <strong>OpenCR 1.0</strong> board. This microcontroller handles the real-time PID control loops for the 
          Dynamixel servomotors, computes wheel odometry from encoder ticks, and reads data from the onboard IMU (gyroscope/accelerometer) to 
          correct heading drift.
        </p>
        <p>
          For <strong>Localization and Mapping</strong>, we utilized a probabilistic approach. We implemented a Particle Filter-based SLAM algorithm. 
          The robot fuses proprioceptive data (wheel odometry + IMU) with exteroceptive data (LiDAR laser scans). The Extended Kalman Filter (EKF) 
          was employed (via the `robot_localization` package) to fuse these sensor streams, providing a robust state estimate even when wheel slippage 
          occurred.
        </p>

        <img src="images/prjct/prjct_ros-tb3/method.png" alt="SLAM and Navigation" className="my-6 w-full rounded-lg" />

        <p>
          For <strong>Trajectory Planning</strong>, we adopted a hierarchical control strategy. The Global Planner computes the optimal kinematic path 
          from start to goal across the static map. The Local Planner (Controller) generates velocity commands (<i>v, \omega</i>) to follow this path 
          while reacting to the local costmap, which updates in real-time to reflect dynamic obstacles. We extensively tested the <strong>Dynamic 
            Window Approach (DWA)</strong>, tuning parameters such as acceleration limits and goal tolerance to ensure smooth motion profiles.
        </p>

        <h3>RESULTS</h3>
        <p>
          The project culminated in a fully functional AMR prototype capable of autonomous operations. We successfully demonstrated <strong>Gmapping 
            and Cartographer</strong> SLAM, generating high-fidelity maps of the laboratory environment with loop closure detection. The navigation 
            stack was validated through "point-and-click" autonomy in RViz; the robot could navigate from an arbitrary start pose to a goal pose, 
            dynamically re-planning its route when an obstacle (e.g., a person) blocked its path.
        </p>
        <p>
          The hardware-software integration via <strong>Micro-ROS</strong> (or a custom serial bridge) proved stable, achieving high-frequency odometry 
          updates (50Hz) essential for accurate dead-reckoning. The separation of concerns between the RPi (High-Level) and OpenCR (Low-Level) ensured 
          that heavy processing loads on the vision/mapping side did not induce jitter in the motor control loops, validating the heterogeneous architecture 
          choice.
        </p>

        <video 
        src="images/prjct/prjct_ros-tb3/results.mp4" 
        className="my-6 w-full rounded-lg"
        controls
        >
          Your browser does not support the video tag.
        </video>

        <h3>STRUGGLES & WHAT'S NEXT</h3>
        <p>
          The transition from theoretical robotics to physical implementation revealed significant challenges. <strong>Network configuration in ROS2
            </strong> (DDS discovery across WiFi) was initially unstable, requiring careful tuning of XML configuration files to ensure reliable node 
            discovery between the development PC and the robot. Mechanical issues, specifically wheel slippage on different floor surfaces, introduced 
            systematic errors in odometry, which necessitated rigorous calibration of the EKF covariance matrices to trust the IMU/LiDAR data over encoders 
            during turns.
        </p>
        <p>
          Future development focuses on enhancing the perception capabilities. We aim to integrate a <strong>Depth Camera (RGB-D)</strong> to detect 
          obstacles below the LiDAR's scanning plane and to enable Visual SLAM (vSLAM) for 3D mapping. From an algorithmic perspective, replacing the 
          standard DWA local planner with a <strong>Deep Reinforcement Learning (DRL)</strong> agent is a key research direction. This would allow the 
          robot to learn socially compliant navigation policies in crowded environments, moving beyond simple obstacle avoidance to complex interaction 
          management.
        </p>
      </>
    ),  
  },
  {
    id: 'cybertank',
    title: 'End-to-End Design of a Tank inspired by Tesla\'s Cybertruck: The CyberTank',
    subtitle: "Design of the CyberTank",
    description: 'Design and prototype a tank inspired by Tesla\'s Cybertruck, focusing on mechanical structure, mobility, and control systems on an Arduino.',
    imageUrl: 'images/prjct/prjct_cybertank/intro.jpg',
    tags: ['Robotics', 'Mechanical', 'Electrical', 'C/C++'],
    year: 2023,
    duration: '4 months',
    timeline: '2023 • 4 months',
    longDescription:
      (
      <>
        <h3>INTRODUCTION</h3>
        <p>
          Autonomous Mobile Robotics requires the seamless integration of mechanical engineering, power electronics, and embedded software control. 
          This project, completed during the third year of the Mechatronics Bachelor's program, focused on the complete development lifecycle of a 
          vision-guided tracked vehicle, internally codenamed "Cybertank." The initiative was driven by a desire to move beyond standard wheeled platforms 
          and explore the complexities of tracked locomotion, which offers superior traction and maneuverability on uneven terrain but introduces significant 
          challenges in terms of friction management and kinematic control.
        </p>
        <p>
          The core philosophy of the project was "design-from-scratch." Rather than assembling a commercial kit, the goal was to engineer every subsystem: 
          from the chassis geometry and suspension dynamics to the power distribution network and decision-making algorithms. The robot was designed to operate 
          autonomously, detecting specific visual targets (color signatures) and navigating towards them while maintaining a set distance. This required 
          addressing real-world engineering constraints, such as the trade-off between torque and speed in actuator selection, the thermal dissipation in 
          motor drivers, and the computational limits of 8-bit microcontrollers for real-time image processing integration. The project served as a practical 
          crucible for applying theoretical knowledge in mechanics (gear ratios, stress analysis) and electronics (H-bridges, signal processing).
        </p>

        <h3>OBJECTIVES</h3>
        <p>
          The primary technical objective was to build a rugged, autonomous chassis capable of traversing rough terrain while carrying a payload of sensors. 
          A specific target was to implement a <strong>Differential Steering</strong> system—initially conceived as a mechanical double-differential system 
          similar to Main Battle Tanks (MBTs), and later adapted to an electronic skid-steer configuration. The robot needed to achieve a nominal linear 
          velocity comparable to human walking speed (approx. 1.5 m/s) while delivering sufficient torque to overcome the high static friction inherent in 
          tracked systems.
        </p>
        <p>
          From a control perspective, the objective was to close the loop between perception and action. We aimed to integrate a <strong>Pixy2 CMUcam5</strong> 
          vision sensor to perform real-time object tracking. The system needed to interpret the centroid coordinates (<i>x, y</i>) and bounding box width 
          of a target object to generate steering and throttle commands. Specifically, the control loop had to adjust the Pulse Width Modulation (PWM) duty 
          cycles of the left and right motors to keep the target centered in the Field of View (FOV) and maintain a constant distance, effectively emulating 
          a "follow-me" behavior. A secondary objective was to implement odometry using quadrature encoders to enable precise dead-reckoning navigation, 
          although this proved to be a significant stretch goal given the hardware constraints.
        </p>

        <h3>METHOD</h3>
        <p>
          The mechanical design phase was extensive. We utilized Autodesk Inventor for CAD modeling. Initially, we attempted to engineer a complex <strong>
            mechanical double-differential gearbox</strong>. This system uses three inputs (two propulsion motors and one steering motor) to mechanically 
            distribute power to the tracks. We 3D printed the gears and housing using PLA. However, realizing the high frictional losses and tolerance issues 
            of printed gears, we pivoted to a robust <strong>dual-drive independent track system</strong>. We designed a custom suspension system involving 
            spring-loaded tensioners to maintain track tension and absorb shocks. The chassis was fabricated from laser-cut Plexiglass for structural rigidity 
            and internal visibility.
        </p>
        <p>
          The electronic architecture was built around an <strong>Arduino MEGA 2560</strong>. We selected high-power Pololu 6V DC gearmotors (9.7:1 ratio) 
          equipped with magnetic quadrature encoders (48 CPR) to provide high torque (39 oz-in stall). To drive these motors, we utilized the <strong>L298N 
            Dual H-Bridge</strong> driver, capable of handling the inductive loads and providing bidirectional control. Power was supplied by a custom 9.6V 
            2000mAh Ni-MH battery pack, dimensioned to handle the significant stall currents (up to 14A combined).
        </p>

        <img src="images/prjct/prjct_cybertank/method.jpg" alt="Electronic Schematic" className="my-6 w-full rounded-lg" />

        <p>
          The software was developed in C++ within the Arduino framework. We implemented a state machine to handle the robot's behaviors (Idle, Search, Track). 
          The vision processing was offloaded to the Pixy2's onboard FPGA, which communicated object blocks via SPI/ICSP to the Arduino. The main control loop 
          read these object blocks and applied a <strong>Proportional (P) controller</strong>: the error between the object's center and the image center 
          drove the differential speed of the motors. We mapped the object's width (in pixels) to distance, stopping the robot when the target was sufficiently 
          close.
        </p>

        <h3>RESULTS</h3>
        <p>
          The final prototype successfully demonstrated autonomous visual tracking. The robot could reliably lock onto a specific color signature (e.g., a 
          blue object) and rotate its chassis to follow the target's lateral movements. The longitudinal tracking also functioned as intended, with the robot 
          accelerating to catch up to a receding target and braking when the target approached. The mechanical pivot to independent direct-drive motors proved 
          crucial; it simplified the transmission chain and improved reliability compared to the 3D-printed differential.
        </p>
        <p>
          Mechanically, the custom suspension system functioned well on flat surfaces, maintaining track tension. The electronic architecture handled the 
          power requirements without overheating, thanks to the high voltage overhead (9.6V supply for 6V motors allowing for voltage drop across the L298N). 
          We characterized the motor response, verifying the correlation between PWM duty cycle and rotational speed, which validated our power train 
          sizing calculations. The battery life was tested to be approximately 1.5 hours under mixed driving conditions, meeting the design requirements.
        </p>

        <img src="images/prjct/prjct_cybertank/results.jpg" alt="Suspension Mechanism" className="my-6 w-full rounded-lg" />

        <h3>STRUGGLES & WHAT'S NEXT</h3>
        <p>
          The project faced significant mechanical hurdles. The initial ambition to print a fully functional mechanical differential was thwarted by the 
          limitations of FDM printing; the friction and backlash in the printed gears were too high for efficient power transmission. Furthermore, the 3D-printed 
          track links were fragile and prone to snapping under lateral stress, forcing a switch to commercial rubber tracks which, while reliable, 
          introduced integration challenges with our custom sprockets (pitch mismatch leading to derailments).
        </p>
        <p>
          On the software side, integrating the <strong>quadrature encoders</strong> for closed-loop speed control remained an unresolved challenge. 
          The high interrupt frequency generated by the Hall effect sensors saturated the Arduino's processing capabilities when running alongside the 
          vision logic, leading to missed counts and inaccurate odometry. Consequently, the final demo relied on open-loop voltage control.
        </p>
        <p>
          Future iterations would focus on upgrading the computing core to a <strong>Raspberry Pi</strong> or Jetson Nano to handle the encoder interrupts 
          and run more sophisticated path planning algorithms (ROS). Mechanically, switching to resin printing or CNC machining for gears would allow us 
          to revisit the mechanical differential concept. Adding a dedicated IMU would also help mitigate the odometry drift inherent in skid-steer vehicles, 
          enabling true autonomous waypoint navigation.
        </p>
      </>
    ),  
  },
];

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProject, setActiveProject] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [minYear, setMinYear] = useState(() => Math.min(...allProjects.map((p) => p.year)));
  const scrollAreaRef = useRef(null);
  const projectRefs = useRef({});
  const yearBounds = useMemo(() => {
    const years = allProjects.map((p) => p.year);
    return { min: Math.min(...years), max: Math.max(...years) };
  }, []);

  const filteredProjects = useMemo(() => {
    const meetsYear = (project) => project.year >= minYear;
    const meetsTags = (project) =>
      selectedTags.length === 0 || selectedTags.every((tag) => project.tags.includes(tag));

    return allProjects.filter((project) => meetsYear(project) && meetsTags(project));
  }, [minYear, selectedTags]);

  const computeActiveProject = useCallback(() => {
    const container = scrollAreaRef.current;
    if (!container || !filteredProjects.length) return;
    const center = container.scrollTop + container.clientHeight / 2;

    let closestId = filteredProjects[0]?.id;
    let closestDistance = Number.POSITIVE_INFINITY;

    filteredProjects.forEach((project) => {
      const node = projectRefs.current[project.id];
      if (!node) return;
      const midpoint = node.offsetTop + node.clientHeight / 2;
      const distance = Math.abs(midpoint - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = project.id;
      }
    });

    if (closestId) {
      setActiveProject(closestId);
    }
  }, [filteredProjects]);

  useEffect(() => {
    const container = scrollAreaRef.current;
    if (!container) return undefined;

    computeActiveProject();
    const handler = () => computeActiveProject();
    container.addEventListener('scroll', handler, { passive: true });

    return () => container.removeEventListener('scroll', handler);
  }, [computeActiveProject]);

  useEffect(() => {
    if (filteredProjects.length) {
      setActiveProject(filteredProjects[0].id);
      computeActiveProject();
    } else {
      setActiveProject('');
    }
  }, [filteredProjects, computeActiveProject]);

  const scrollToProject = (id) => {
    const element = projectRefs.current[id];
    if (element && scrollAreaRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const handleTagToggle = (tag) => {
    if (tag === 'All') {
      setSelectedTags([]);
      return;
    }

    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleYearChange = (event) => {
    setMinYear(parseInt(event.target.value, 10));
  };

  return (
    <>
      <PageContainer>
        <Sidebar>
          <SidebarTitle>Jump to project</SidebarTitle>
          <ProjectList>
            {filteredProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                active={project.id === activeProject}
                onClick={() => scrollToProject(project.id)}
              >
                {project.subtitle}
              </ProjectListItem>
            ))}
          </ProjectList>
          <SliderContainer>
            <SliderLabel>
              <span>From year</span>
              <span>{minYear}+</span>
            </SliderLabel>
            <SliderInput
              type="range"
              min={yearBounds.min}
              max={yearBounds.max}
              step={1}
              value={minYear}
              onChange={handleYearChange}
            />
          </SliderContainer>
        </Sidebar>

        <ProjectsContainer>
          <TagFilterBar>
            {['All', ...Object.keys(tagColors)].map((tag) => {
              const isActive = tag === 'All' ? selectedTags.length === 0 : selectedTags.includes(tag);
              return (
                <TagFilterButton
                  key={tag}
                  active={isActive}
                  color={tagColors[tag] || 'rgba(15,23,42,0.06)'}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </TagFilterButton>
              );
            })}
          </TagFilterBar>

          <ProjectsScroll ref={scrollAreaRef}>
            {filteredProjects.map((project) => (
              <ProjectWrapper
                key={project.id}
                id={project.id}
                ref={(node) => {
                  if (node) {
                    projectRefs.current[project.id] = node;
                  }
                }}
                isActive={project.id === activeProject}
                isHovered={project.id === hoveredProject}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project)}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  tags={project.tags}
                  tagColors={tagColors}
                  timeline={project.timeline}
                />
              </ProjectWrapper>
            ))}
          </ProjectsScroll>
        </ProjectsContainer>
      </PageContainer>

      <OverlayBackdrop open={!!selectedProject} onClick={handleBackClick} />
      {selectedProject && (
        <ProjectOverlay>
          <OverlayContent>
            <ProjectDetail project={selectedProject} onBack={handleBackClick} tagColors={tagColors} />
          </OverlayContent>
        </ProjectOverlay>
      )}
    </>
  );
};

export default ProjectsPage;
