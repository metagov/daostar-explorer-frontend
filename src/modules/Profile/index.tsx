import { NextPageContext } from "next";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import { isAddress } from "web3-validator";

import { getActivity } from "~/lib/api";
import type { APIResponseError } from "~/lib/client";

import type { Contribution, Reputation } from "~/lib/types";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import AddressSearch from "~/components/shared/AddressSearch";
import ContributionCard from "~/components/shared/ContributionCard";
import ReputationCard from "~/components/shared/ReputationCard";
import Box from "~/components/ui/Box";
import { Regular, Title } from "~/components/ui/Typography";

// TODO: Remove this, debug only
const { REACT_APP_API_URL } = process.env;

interface ProfileProps {
  address: string;
}

interface SectionContent {
  data: Contribution[] | Reputation[];
  isFetching: boolean;
  errors: APIResponseError[] | null;
}

interface ContributionListProps {
  contributions: Contribution[];
}

interface ReputationListProps {
  reputation: Reputation[];
}

const HeaderWrapper = styled(Box, {
  display: "flex",
  flexDirection: "column",
  fontFamily: "$IBMPlexSans",
  color: "white",
  gap: "$16",
});

const sectionContentWithoutData = (
  isFetching: boolean,
  errors: APIResponseError[] | null,
) => {
  if (isFetching) return <Regular>Fetching...</Regular>;
  if (errors)
    return <Regular>{errors.map((e) => e.message).join("\n")}</Regular>;

  return null;
};

const ReputationList = ({ reputation }: ReputationListProps) => {
  const content =
    reputation.length === 0 ? (
      <Regular>No reputation yet.</Regular>
    ) : (
      reputation.map((r) => <ReputationCard key={r.id} {...r} />)
    );

  return <CardListWrapper>{content}</CardListWrapper>;
};

const ContributionList = ({ contributions }: ContributionListProps) => {
  const content =
    contributions.length === 0 ? (
      <Regular>No contributions yet.</Regular>
    ) : (
      contributions.map((c) => <ContributionCard key={c.id} {...c} />)
    );

  return <CardListWrapper>{content}</CardListWrapper>;
};

const ContributionSection = ({ isFetching, errors, data }: SectionContent) => {
  return (
    <HeaderWrapper>
      <Title>Profile</Title>
      {sectionContentWithoutData(isFetching, errors) || (
        <ContributionList contributions={data as Contribution[]} />
      )}
    </HeaderWrapper>
  );
};

const ReputationSection = ({ isFetching, errors, data }: SectionContent) => {
  return (
    <HeaderWrapper>
      <Title>Reputation</Title>
      {sectionContentWithoutData(isFetching, errors) || (
        <ReputationList reputation={data as Reputation[]} />
      )}
    </HeaderWrapper>
  );
};

const Address = ({ address }: { address: string }) => (
  <p>
    <strong>
      Address: <Regular>{address}</Regular>
    </strong>
  </p>
);

const CardListWrapper = styled(Box, {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "$42 $16",
});

const LayoutContainer = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$42",
});

const ContentContainer = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$30",
  color: "$white",
  fontFamily: "$IBMPlexSans",
});

export default function Profile(props: ProfileProps) {
  const { address } = props;
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [reputation, setReputation] = useState<Reputation[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errors, setErrors] = useState<APIResponseError[] | null>();

  console.log("REACT_APP_API_URL", REACT_APP_API_URL);

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors } = await getActivity(address);

      if (data) {
        setContributions(data.data.contributions);
        setReputation(data.data.reputation);
      }

      if (errors) {
        setErrors(errors);
      }

      setIsFetching(false);
    };

    if (isAddress(address)) {
      fetchData();
    } else {
      setErrors([{ status: 401, message: "Invalid address" }]);
      setIsFetching(false);
    }
  }, [address]);

  return (
    <CenteredLayout>
      <LayoutContainer>
        <AddressSearch />
        <ContentContainer>
          <Address address={address} />

          <ReputationSection
            data={reputation}
            isFetching={isFetching}
            errors={errors}
          />

          <ContributionSection
            data={contributions}
            isFetching={isFetching}
            errors={errors}
          />
        </ContentContainer>
      </LayoutContainer>
    </CenteredLayout>
  );
}

Profile.getInitialProps = async (ctx: NextPageContext) => {
  const { address } = ctx.query;

  return {
    address,
  };
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { previousRoute: context.req.headers.referer ?? null },
  };
}
